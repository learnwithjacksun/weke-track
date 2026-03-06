import { useState, useEffect } from "react";

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Detect if the app is running as an installed PWA (standalone / from home screen).
 * When true, hide the "Install App" section.
 */
export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const standalone = window.matchMedia("(display-mode: standalone)").matches;
  const iosStandalone = (window.navigator as { standalone?: boolean }).standalone === true;
  return standalone || iosStandalone;
}

/**
 * Detect if the user is on iOS (to show "Add to Home Screen" instructions).
 */
export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

/**
 * Detect if the user is on a desktop (Windows, Mac, Linux) for install instructions.
 */
export function isDesktop(): boolean {
  if (typeof navigator === "undefined") return false;
  return !isIOS() && !/Android/.test(navigator.userAgent);
}

export function usePWAInstall() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [isDesktopDevice, setIsDesktopDevice] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    setIsInstalled(isStandalone());
    setIsIOSDevice(isIOS());
    setIsDesktopDevice(isDesktop());

    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const triggerInstall = async (): Promise<boolean> => {
    if (!installPrompt) return false;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstallPrompt(null);
      setCanInstall(false);
      setIsInstalled(true);
      return true;
    }
    return false;
  };

  const showInstallSection = !isInstalled;
  const showIOSInstructions = showInstallSection && isIOSDevice;
  const showAndroidInstallButton = showInstallSection && !isIOSDevice && canInstall;
  const showGenericInstallHint = showInstallSection && !isIOSDevice && !canInstall;
  const showDesktopInstructions = showGenericInstallHint && isDesktopDevice;

  return {
    isInstalled,
    showInstallSection,
    showIOSInstructions,
    showAndroidInstallButton,
    showGenericInstallHint,
    showDesktopInstructions,
    triggerInstall,
  };
}

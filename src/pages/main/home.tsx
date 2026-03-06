import { Link } from "react-router-dom";
import { ArrowCircleDown, ArrowRight, AddSquare } from "iconsax-reactjs";
import { usePWAInstall } from "@/hooks";

export default function Home() {
  const {
    showInstallSection,
    showIOSInstructions,
    showAndroidInstallButton,
    showGenericInstallHint,
    showDesktopInstructions,
    triggerInstall,
  } = usePWAInstall();

  return (
    <div className="min-h-[100dvh] bg-gradient-to-t from-[#111827] to-[#1f2937] py-20">
      <div className="max-w-[480px] w-[90%] mx-auto">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10">
              <img src="/logo.svg" alt="" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-2xl font-bold text-white">Weke Tracks</h3>
          </div>
          <p className="text-white/60 text-sm">
            Your friendly tracking assistant for budget and tasks
          </p>
        </div>

        <div className="space-y-4 mt-10">
          <div className="space-y-4 bg-[#374151] p-4 rounded-lg">
            <h2 className="text-sm font-bold text-white">
              What can you do with Weke Tracks?
            </h2>
            <ul className="list-disc list-inside text-gray-400 text-xs space-y-2">
              <li>Track your budget and expenses easily</li>
              <li>Manage your daily or weekly tasks</li>
              <li>See progress and stats at a glance</li>
              <li>Stay on top of your goals with reminders</li>
            </ul>
            <p className="text-white text-xs pt-2">
              All your productivity, organized and at your fingertips.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              to="/budget"
              className="btn btn-primary text-nowrap p-4 flex-1 rounded-lg text-white"
            >
              View your tracks <ArrowRight />
            </Link>
          </div>
        </div>

        {showInstallSection && (
          <div className="mt-20 space-y-4">
            {showIOSInstructions && (
              <div className="bg-[#374151]/80 border border-[#4b5563] rounded-xl p-4 text-left">
                <p className="text-white font-semibold text-sm flex items-center gap-2">
                  <AddSquare size={18} className="text-primary" />
                  Add to Home Screen
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  To install this app on your iPhone or iPad: tap the Share
                  button{" "}
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-gray-500 text-white text-[10px]">
                    ↑
                  </span>{" "}
                  in Safari, then scroll and tap <strong className="text-gray-300">“Add to Home Screen”</strong>.
                </p>
              </div>
            )}

            {showAndroidInstallButton && (
              <button
                type="button"
                onClick={() => triggerInstall()}
                className="flex items-center justify-center gap-2 text-primary font-semibold mx-auto w-full py-3 rounded-xl border border-primary/50 bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <ArrowCircleDown variant="Bold" className="animate-bounce" size={22} />
                Install App
              </button>
            )}

            {showDesktopInstructions && (
              <div className="bg-[#374151]/80 border border-[#4b5563] rounded-xl p-4 text-left">
                <p className="text-white font-semibold text-sm flex items-center gap-2">
                  <AddSquare size={18} className="text-primary" />
                  Install on this computer
                </p>
                <p className="text-gray-400 text-xs mt-2 mb-3">
                  Use your browser menu to install Weke Track. It will open in its own window like an app.
                </p>
                <ul className="text-gray-400 text-xs space-y-1.5">
                  <li>
                    <strong className="text-gray-300">Chrome:</strong> Click the ⋮ menu (top right) → “Install Weke Track” or “Save and share” → “Install app”.
                  </li>
                  <li>
                    <strong className="text-gray-300">Edge:</strong> Click the ⋮ menu (top right) → “Apps” → “Install this site as an app”.
                  </li>
                </ul>
              </div>
            )}

            {showGenericInstallHint && !showIOSInstructions && !showDesktopInstructions && (
              <p className="text-center text-gray-500 text-xs">
                To install: open the browser menu (⋮) and choose “Install app” or
                “Add to Home screen”.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

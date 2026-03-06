import { Link } from "react-router-dom";
import { ArrowCircleDown, ArrowRight } from "iconsax-reactjs";

export default function Home() {
  return (
    <div className='min-h-[100dvh] bg-gradient-to-t from-[#111827] to-[#1f2937] pt-20'>
      <div className="max-w-[480px] w-[90%] mx-auto">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10">
              <img src="/logo.svg" alt="" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-2xl font-bold text-white">Weke Tracks</h3>
          </div>
          <p className="text-white/60 text-sm">Your friendly tracking assistant for budget and tasks</p>
        </div>

        <div className="space-y-4 mt-10">
          <div className="space-y-4 bg-[#374151] p-4 rounded-lg">
            <h2 className="text-sm font-bold text-white">What can you do with Weke Tracks?</h2>
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

          <div className=" flex items-center gap-4 flex-wrap">
            <Link to="/budget" className="btn btn-primary text-nowrap p-4 flex-1 rounded-lg text-white">
              View your tracks <ArrowRight />
            </Link>
            {/* <Link to="/auth" className="bg-[#1f2937] text-nowrap hover:bg-[#2f3f50] transition-all duration-300 btn p-4 flex-1 rounded-lg text-white">
              New user?
            </Link> */}
          </div>
        </div>


        <button className="text-center mt-20 text-primary font-semibold mx-auto">
          <ArrowCircleDown variant="Bold" className="animate-bounce" />
          Install App
        </button>
      </div>
    </div>
  )
}

import { ArrowCircleLeft, ArrowRight } from "iconsax-reactjs";
import { Link } from "react-router-dom";


export default function Auth() {
    return (
        <div className='min-h-[100dvh] bg-gradient-to-t from-[#111827] to-[#1f2937] pt-20'>
            <div className="max-w-[400px] w-[90%] mx-auto">
                <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-10 h-10">
                            <img src="/logo.svg" alt="" className="w-full h-full object-contain" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Weke Track</h3>
                    </div>
                    <p className="text-white/60 text-sm">Your friendly tracking assistant (budget and tasks)</p>
                </div>

                <form action="" className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="name" className="text-sm font-bold text-white">Name</label>
                        <input type="text" id="name" placeholder="e.g Scorpion" className="w-full h-11 text-gray-300 px-4 rounded-lg border border-gray-300 placeholder:text-gray-400 placeholder:text-sm" />
                    </div>

                    <button className="btn btn-primary text-nowrap h-11 w-full flex-1 rounded-lg text-white">
                        Continue <ArrowRight/>
                    </button>
                </form>

                <Link to="/" className="center text-sm gap-2 text-center mt-20 text-primary font-medium mx-auto">
                    <ArrowCircleLeft variant="Bold" />
                    Go back
                </Link>
            </div>
        </div>
    )
}

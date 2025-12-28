import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#0B0D10] via-[#0E1016] to-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-175 bg-indigo-600/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 -right-50 w-125 h-125 bg-violet-600/20 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl text-center space-y-8 animate-fade-up">
          <h1 className="font-['Playfair_Display'] text-3xl md:text-5xl  leading-tight text-gray-100">
            Send resumes{" "}
            <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              deliberately
            </span>
            ,<br className="hidden md:block" />
            not desperately.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            HireFlow helps you manage job outreach with intent — preventing
            accidental re-sending and keeping your communication professional.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <button
              onClick={() => navigate("/login")}
              className="
                inline-flex items-center justify-center gap-2
                px-8 py-4
                rounded-xl
                bg-linear-to-r from-indigo-500 to-violet-500
                hover:from-indigo-600 hover:to-violet-600
                text-sm font-medium text-white
                shadow-[0_20px_40px_rgba(99,102,241,0.35)]
                transition
              "
            >
              Get Started
              <HiOutlineArrowRight />
            </button>

            <button
              className="
                px-8 py-4
                rounded-xl
                border border-[#23283A]
                text-sm font-medium text-gray-300
                hover:border-gray-400 hover:text-gray-100
                transition
              "
            >
              See how it works
            </button>
          </div>

          <p className="pt-8 text-sm text-gray-500">
            Built for candidates who value clarity over volume.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;

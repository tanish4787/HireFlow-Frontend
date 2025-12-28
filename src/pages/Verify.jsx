import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyMagicLink } from "../api/auth.api";
import { useAuthStore } from "../stores/auth.store";
import { FiLoader } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = useAuthStore((state) => state.login);

  const hasCalledApi = useRef(false);

  useEffect(() => {
    "[VERIFY PAGE MOUNTED]", window.location.href;

    const token = searchParams.get("token");
    "[VERIFY TOKEN]", token;

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (hasCalledApi.current) return;
    hasCalledApi.current = true;

    const verify = async () => {
      try {
        ("[VERIFY CALLING API]");

        const res = await verifyMagicLink(token);
        "[VERIFY SUCCESS]", res;

        if (res && res.token) {
          login(res.token);
          navigate("/dashboard", { replace: true });
          
        } else {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.warn("[VERIFY FAILED]", error?.response?.data?.message);
        navigate("/login", { replace: true });
      }
    };

    verify();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-linear-to-br from-[#0B0D10] via-[#0E1016] to-black">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-105 h-105 bg-indigo-600/20 blur-[120px] rounded-full" />
      </div>

      <div
        className="
          relative z-10
          w-full max-w-md
          bg-[#161A22]
          border border-[#23283A]
          rounded-2xl
          p-8
          text-center
          space-y-5
          shadow-[0_30px_60px_rgba(0,0,0,0.6)]
          animate-fade-up
        "
      >
        <div className="flex justify-center">
          <div className="relative">
            <HiOutlineShieldCheck className="text-4xl text-indigo-400" />
            <FiLoader className="absolute -bottom-2 -right-2 text-indigo-300 animate-spin" />
          </div>
        </div>

        <h1 className="font-['Playfair_Display'] text-2xl text-gray-100">
          Verifying your login
        </h1>

        <p className="text-sm text-gray-400 leading-relaxed">
          We’re securely validating your magic link.  
          This will only take a moment.
        </p>

        <div className="pt-2">
          <div className="h-1 w-full bg-[#0F1117] rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-linear-to-r from-indigo-500 to-violet-500 animate-pulse rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;

import { useState } from "react";
import { requestMagicLink } from "../api/auth.api";
import { HiOutlineMail, HiOutlinePaperAirplane } from "react-icons/hi";
import { FiLoader } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      await requestMagicLink(email);
      setMessage("Magic link sent. Check your email.");
      setEmail("");
    } catch (error) {
      setMessage("Failed to send magic link. Try again.");
      console.error("Error sending magic Link ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-linear-to-br from-[#0B0D10] via-[#0E1016] to-black">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-120 h-120 bg-indigo-600/20 blur-[120px] rounded-full" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="
          relative z-10
          w-full max-w-md
          bg-[#161A22]
          border border-[#23283A]
          rounded-2xl
          p-8
          shadow-[0_30px_60px_rgba(0,0,0,0.6)]
          space-y-6
          animate-fade-up
        "
      >
        <div className="text-center space-y-2">
          <h1 className="font-['Playfair_Display'] text-3xl text-gray-100">
            Welcome to HireFlow
          </h1>
          <p className="text-sm text-gray-400">
            Deliberate job outreach starts here.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-medium text-gray-400">
            Email address
          </label>

          <div className="relative">
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full
                pl-11 pr-4 py-3
                bg-[#0F1117]
                border border-[#23283A]
                rounded-xl
                text-gray-200
                placeholder-gray-500
                focus:outline-none
                focus:ring-2 focus:ring-indigo-500/60
                transition
              "
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            flex items-center justify-center gap-2
            py-3
            rounded-xl
            bg-linear-to-r from-indigo-500 to-violet-500
            hover:from-indigo-600 hover:to-violet-600
            text-sm font-medium
            text-white
            transition
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              Sending magic link…
            </>
          ) : (
            <>
              <HiOutlinePaperAirplane />
              Send magic link
            </>
          )}
        </button>

        {message && (
          <p
            className={`text-sm text-center ${
              message.includes("Failed") ? "text-red-400" : "text-green-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;

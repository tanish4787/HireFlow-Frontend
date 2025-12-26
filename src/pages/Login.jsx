import { useState } from "react";
import { requestMagicLink } from "../api/auth.api";

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" "
    >
      <div className="border-2 w-3xl h-16 rounded-2xl flex items-center justify-center gap-1 flex-col">
        <label htmlFor="email" className="">Email</label>

        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-2 rounded-2xl"
        />

        <button type="submit" disabled={loading} className="border-2 rounded-xl">
          {loading ? "Sending..." : "Send Magic Link"}
        </button>

        {message && <p>{message}</p>}
      </div>
    </form>
  );
};

export default Login;

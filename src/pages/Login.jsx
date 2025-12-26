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
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>

      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Magic Link"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;

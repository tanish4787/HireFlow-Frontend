import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyMagicLink } from "../api/auth.api";
import { useAuthStore } from "../stores/auth.store";

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
          navigate("/", { replace: true });
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

  return <p>Verifying login…</p>;
};

export default Verify;

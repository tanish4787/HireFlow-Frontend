import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  "[PROTECTED ROUTE]", isAuthenticated;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

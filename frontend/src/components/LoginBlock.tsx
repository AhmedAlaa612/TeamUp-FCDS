import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

function LoginBlock() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/teams" /> : <Outlet />;
}

export default LoginBlock;

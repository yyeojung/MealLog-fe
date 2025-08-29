import { Navigate, Outlet } from "react-router-dom";
import { isToken } from "@/utils/token";
import PATHS from "./paths";

const PrivateRoute = () => {
  return isToken ? <Outlet /> : <Navigate to={PATHS.LOGIN.path} />;
};

export default PrivateRoute;

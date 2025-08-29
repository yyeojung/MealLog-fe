import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isToken, isUserInfo, USER_INFO } from "@/utils/token";
import PATHS from "./paths";

const PrivateRoute = () => {
  const location = useLocation();

  if (!isToken() || !isUserInfo()) {
    return <Navigate to={PATHS.LOGIN.path} />;
  }

  // user status pending 상태일 때 허용된 경로만 접근 가능
  if (USER_INFO()?.status === "pending") {
    const allowedPaths: string[] = [PATHS.LOGIN.path, PATHS.SETUP.path];

    if (!allowedPaths.includes(location.pathname)) {
      return <Navigate to={PATHS.SETUP.path} />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;

import type { ReactNode } from "react";
import NavigationBar from "./components/NavigationBar";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import PATHS from "@/routes/paths";
import clsx from "clsx";
import { USER_INFO } from "@/utils/token";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const isHome = location.pathname === PATHS.HOME.path;
  const isLogin = location.pathname === PATHS.LOGIN.path;
  const isSetup = location.pathname === PATHS.SETUP.path && USER_INFO?.status === "pending";
  const isSetupUpdate = location.pathname === PATHS.SETUP.path && USER_INFO?.status !== "active";
  const isLogMeal = location.pathname === PATHS.LOGMEAL.path;

  const currentPathInfo = Object.values(PATHS).find((item) => item.path === location.pathname);

  const headerTitle = currentPathInfo?.title;
  return (
    <div
      className={clsx(
        "mx-auto min-h-screen max-w-md bg-gradient-to-br from-blue-50 to-indigo-100",
        !isLogin && !isSetup && "pb-20",
      )}
    >
      {!isHome && !isLogin && !isSetup && (
        <Header title={headerTitle} backPath={isLogMeal ? PATHS.HOME.path : undefined} />
      )}
      {children}
      {!isLogin && !isSetup && !isSetupUpdate && <NavigationBar />}
    </div>
  );
};

export default AppLayout;

import type { ReactNode } from "react";
import NavigationBar from "./components/NavigationBar";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import PATHS from "@/routes/paths";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const currentPathInfo = Object.values(PATHS).find((item) => item.path === location.pathname);

  const headerTitle = currentPathInfo?.title;
  return (
    <div className="mx-auto min-h-screen max-w-md bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {!isHome && <Header title={headerTitle} />}
      {children}
      <NavigationBar />
    </div>
  );
};

export default AppLayout;

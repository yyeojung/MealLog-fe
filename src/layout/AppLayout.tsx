import type { ReactNode } from "react";
import NavigationBar from "./components/NavigationBar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {children}
      <NavigationBar />
    </div>
  );
};

export default AppLayout;

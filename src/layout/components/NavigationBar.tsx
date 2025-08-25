import PATHS from "@/routes/paths";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  const isPathsActive = (paths: string[]) => paths.some((path) => path === location.pathname);

  const navigation = [
    {
      name: "홈",
      href: PATHS.HOME.path,
      paths: [PATHS.HOME.path, PATHS.LOGMEAL.path, PATHS.REGISTERMEAL.path],
      icon: "home-line.svg",
      activeIcon: "home-fill.svg",
    },
    {
      name: "상세",
      href: PATHS.DETAIL.path,
      paths: [PATHS.DETAIL.path],
      icon: "bar-chart-line.svg",
      activeIcon: "bar-chart-fill.svg",
    },
    {
      name: "커뮤니티",
      href: PATHS.COMMUNITY.path,
      paths: [PATHS.COMMUNITY.path],
      icon: "team-line.svg",
      activeIcon: "team-fill.svg",
    },
    {
      name: "My",
      href: PATHS.MYPAGE.path,
      paths: [PATHS.MYPAGE.path],
      icon: "user-line.svg",
      activeIcon: "user-fill.svg",
    },
  ];

  return (
    <div className="fixed right-0 bottom-0 left-0 border-t border-gray-200/50 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-md px-4 py-3">
        <div className="grid grid-cols-4 gap-4">
          {navigation.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  "flex cursor-pointer flex-col items-center py-2 text-xs font-medium",
                  isActive || isPathsActive(item.paths) ? "text-blue-600" : "text-gray-500",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="mb-1 flex h-6 w-6 items-center justify-center">
                    <img
                      src={isActive || isPathsActive(item.paths) ? `/image/${item.activeIcon}` : `/image/${item.icon}`}
                      alt={item.name}
                      className="h-6 w-6"
                    />
                  </div>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;

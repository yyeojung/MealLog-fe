import PATHS from "@/routes/paths";
import clsx from "clsx";
import { Moon, Popcorn, SunMedium, Sunrise } from "lucide-react";
import { Link } from "react-router-dom";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    label: string;
    calories: number;
    type: string;
  }[];
}

const TodayMealBox = ({ items, className, ...props }: Props) => {
  return (
    <div className={`grid grid-cols-3 gap-3 ${className}`} {...props}>
      {items.map((item) => (
        <Link key={item.label} className={className} to={`${PATHS.LOGMEAL.path}?tab=${item.type}`}>
          <div className="cursor-pointer rounded-xl border border-white/20 bg-white/90 p-4 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105">
            <div className="text-center">
              <div
                className={clsx(
                  "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br",
                  item.label === "아침"
                    ? "from-yellow-400 to-orange-500"
                    : item.label === "점심"
                      ? "from-orange-400 to-red-500"
                      : item.label === "저녁"
                        ? "from-purple-400 to-indigo-600"
                        : "from-green-400 to-blue-500",
                )}
              >
                {item.label === "아침" && <Sunrise color="#fff" />}
                {item.label === "점심" && <SunMedium color="#fff" />}
                {item.label === "저녁" && <Moon color="#fff" />}
                {item.label === "간식" && <Popcorn color="#fff" />}
              </div>
              <h4 className="text-sm font-medium text-gray-800">{item.label}</h4>
              <p className="mt-1 text-xs text-gray-600">{item.calories} kcal</p>
            </div>
          </div>
        </Link>
      ))}

      {items.length === 0 && (
        <div className="col-span-3 flex items-center justify-center rounded-xl border border-white/20 bg-white/90 p-4 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105">
          <p className="text-center text-gray-600">식사를 추가해보세요</p>
        </div>
      )}
    </div>
  );
};

export default TodayMealBox;

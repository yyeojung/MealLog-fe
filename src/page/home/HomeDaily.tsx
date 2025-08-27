import { Badge, ProgressBar } from "@/components/shared";
import PATHS from "@/routes/paths";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import TodayMealBox from "./components/TodayMealBox";
import { USER_INFO } from "@/utils/token";
import { addComma } from "@/utils";

const MOCK_DATA = {
  totalCalories: 1000,
  remainingCalories: 100,
  progress: 83,
};

const HomeDaily = () => {
  const todayMealItems = [
    {
      label: "아침",
      calories: 200,
    },
    {
      label: "점심",
      calories: 300,
    },
    {
      label: "저녁",
      calories: 100,
    },
  ];
  return (
    <>
      <div className="rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
        <div className="mb-6 text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">오늘의 칼로리</div>
          <div className="relative">
            <div className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
              {addComma(MOCK_DATA?.totalCalories)}
              <span className="ml-2 text-xl text-gray-500">kcal</span>
            </div>
            <div className="text-sm text-gray-600">
              목표 <strong>{addComma(USER_INFO?.goalCalories)} kcal</strong> 중&nbsp;
              <strong>{MOCK_DATA.remainingCalories} kcal</strong> 남음
            </div>
          </div>
        </div>
        <div className="relative mb-4">
          <ProgressBar progress={83} label={{ middle: "83%", max: `${addComma(USER_INFO?.goalCalories)} kcal` }} />
        </div>
        <div className="flex items-center justify-center">
          <Badge size="m" color="yellow">
            거의 다 왔어요! 💪
          </Badge>
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">오늘의 식사</h3>
          <Link
            className="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-sm whitespace-nowrap text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            to={PATHS.REGISTERMEAL.path}
          >
            <Plus size={16} />
            식단 추가
          </Link>
        </div>
        <TodayMealBox items={todayMealItems} />
      </div>
    </>
  );
};

export default HomeDaily;

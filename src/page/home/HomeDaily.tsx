import { Badge, ProgressBar } from "@/components/shared";
import PATHS from "@/routes/paths";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import TodayMealBox from "./components/TodayMealBox";
import { USER_INFO } from "@/utils/token";
import { addComma } from "@/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/features/store";
import { getMyMeal } from "@/features/meal/mealSlice";

const HomeDaily = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // 원하는 쿼리 전달
    dispatch(
      getMyMeal({
        date: new Date().toISOString().split("T")[0],
      }),
    );
  }, [dispatch]);

  const mealList = useSelector((state: RootState) => state.meal.meals);
  const totals = useSelector((state: RootState) => state.meal.totals);
  const remainingCalories = USER_INFO?.goalCalories - totals?.calories;
  const progress = Math.round((totals?.calories / USER_INFO?.goalCalories) * 100);

  const todayMealItems = mealList.map((meal) => {
    const totalCalories = meal.foods.reduce((sum, food) => sum + food.calories, 0);

    // type에 따른 한글 라벨 매핑
    const typeLabels: Record<string, string> = {
      breakfast: "아침",
      lunch: "점심",
      dinner: "저녁",
      snack: "간식",
    };

    return {
      label: typeLabels[meal.type] || meal.type,
      type: meal.type,
      calories: totalCalories,
    };
  });

  return (
    <>
      <div className="rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
        <div className="mb-6 text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">오늘의 칼로리</div>
          <div className="relative">
            <div className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
              {addComma(totals?.calories)}
              <span className="ml-2 text-xl text-gray-500">kcal</span>
            </div>
            <div className="text-sm text-gray-600">
              목표 <strong>{addComma(USER_INFO?.goalCalories)} kcal</strong> 중&nbsp;
              <strong>{addComma(Math.abs(remainingCalories))} kcal</strong> {remainingCalories > 0 ? "남음" : "초과"}
            </div>
          </div>
        </div>
        <div className="relative mb-4">
          <ProgressBar
            progress={progress}
            color={progress > 120 ? "red" : "green"}
            label={{ middle: `${progress}%`, max: `${addComma(USER_INFO?.goalCalories)} kcal` }}
          />
        </div>
        <div className="flex items-center justify-center">
          {progress < 20 ? (
            <Badge size="m" color="yellow">
              조금만 더 분발하세요! 💪
            </Badge>
          ) : progress >= 21 && progress < 50 ? (
            <Badge size="m" color="green">
              조금만 힘내세요! 💪
            </Badge>
          ) : progress >= 51 && progress < 80 ? (
            <Badge size="m" color="blue">
              좋아요! 잘하고 있어요! 💪
            </Badge>
          ) : progress >= 81 && progress < 100 ? (
            <Badge size="m" color="purple">
              거의 다 도착했어요! 💪
            </Badge>
          ) : progress > 100 && progress < 120 ? (
            <Badge size="m" color="orange">
              오늘 목표 칼로리를 달성했어요! 🎉
            </Badge>
          ) : (
            <Badge size="m" color="red">
              식사량을 조금만 줄여보세요! 😭
            </Badge>
          )}
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

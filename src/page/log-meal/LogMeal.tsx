import { Tabs, LoadingSection } from "@/components/shared";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LogBox from "./components/LogBox";
import KcalBox from "./components/KcalBox";
import { isValidMealType, type MealPayload, type MEALTYPE } from "@/types/Meal";
import useApi from "@/hooks/useApi";

const LogMeal = () => {
  const { request, data, loading } = useApi();

  const [searchParams, setSearchParams] = useSearchParams();
  const DATE = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const MEAL_TYPE = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<MEALTYPE | "all">(
    MEAL_TYPE && isValidMealType(MEAL_TYPE) ? MEAL_TYPE : "all",
  );

  useEffect(() => {
    setSearchParams({ tab: activeTab, date: DATE });
  }, [activeTab, DATE, setSearchParams]);

  const tabs = useMemo(
    () => [
      {
        label: "전체",
        type: "all",
        onClick: () => setActiveTab("all"),
        active: activeTab === "all",
      },
      {
        label: "아침",
        type: "breakfast",
        onClick: () => setActiveTab("breakfast"),
        active: activeTab === "breakfast",
      },

      {
        label: "점심",
        type: "lunch",
        onClick: () => setActiveTab("lunch"),
        active: activeTab === "lunch",
      },

      {
        label: "저녁",
        type: "dinner",
        onClick: () => setActiveTab("dinner"),
        active: activeTab === "dinner",
      },
      {
        label: "간식",
        type: "snack",
        onClick: () => setActiveTab("snack"),
        active: activeTab === "snack",
      },
    ],
    [activeTab],
  );

  const getLabel = (type: string) => {
    const tabItem = tabs.find((tab) => tab.type === type);
    return tabItem?.label || type;
  };

  const getMeal = (type: string) => {
    if (!data?.data?.meals) return [];
    const meal = data.data.meals.filter((meal: MealPayload) => meal.type === type);
    return meal || {};
  };

  const getCalories = (type: string) => {
    if (!data?.data?.totals) return 0;
    return data.data.totals.byType[type]?.calories || 0;
  };

  useEffect(() => {
    const url = activeTab === "all" ? `/meal?date=${DATE}` : `/meal?date=${DATE}&type=${activeTab}`;
    request({
      url,
      method: "get",
    });
  }, [request, activeTab, DATE]);

  return (
    <div className="flex flex-col gap-4 p-6">
      <Tabs items={tabs} />

      {loading ? (
        <LoadingSection />
      ) : (
        <>
          <KcalBox tab={getLabel(activeTab)} date={DATE} calories={data?.data?.totals?.calories || 0} />

          {activeTab === "all" ? (
            <>
              <LogBox tab={getLabel("breakfast")} meal={getMeal("breakfast")} getCalories={getCalories("breakfast")} />
              <LogBox tab={getLabel("lunch")} meal={getMeal("lunch")} getCalories={getCalories("lunch")} />
              <LogBox tab={getLabel("dinner")} meal={getMeal("dinner")} getCalories={getCalories("dinner")} />
            </>
          ) : (
            <LogBox tab={getLabel(activeTab)} meal={getMeal(activeTab)} getCalories={getCalories(activeTab)} />
          )}
        </>
      )}
    </div>
  );
};

export default LogMeal;

import { Tabs, LoadingSection } from "@/components/shared";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LogBox from "./components/LogBox";
import KcalBox from "./components/KcalBox";
import { isValidMealType, type MealPayload, type MEALTYPE } from "@/types/Meal";
import useApi from "@/hooks/useApi";
import PATHS from "@/routes/paths";

const LogMeal = () => {
  const { request, data, loading } = useApi();

  const [searchParams, setSearchParams] = useSearchParams();
  const DATE = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const MEAL_TYPE = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<MEALTYPE | "all">(
    MEAL_TYPE && isValidMealType(MEAL_TYPE) ? MEAL_TYPE : "all",
  );
  const navigate = useNavigate();

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

  const handleMealRemove = async (mealId: string) => {
    try {
      const result = confirm("삭제하시겠습니까?");
      if (!result) return;

      await request({
        url: `/meal/${mealId}`,
        method: "delete",
      });
      await request({ url: `/meal?date=${DATE}`, method: "get" });
      // await dispatch(deleteMeal({ mealId }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (type: string) => {
    navigate(`${PATHS.EDITMEAL.path}?date=${DATE}&type=${type}`);
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
              <LogBox
                tab={getLabel("breakfast")}
                meal={getMeal("breakfast")}
                getCalories={getCalories("breakfast")}
                onRemoveClick={handleMealRemove}
                onEditClick={handleEditClick}
              />
              <LogBox
                tab={getLabel("lunch")}
                meal={getMeal("lunch")}
                getCalories={getCalories("lunch")}
                onRemoveClick={handleMealRemove}
                onEditClick={handleEditClick}
              />
              <LogBox
                tab={getLabel("dinner")}
                meal={getMeal("dinner")}
                getCalories={getCalories("dinner")}
                onRemoveClick={handleMealRemove}
                onEditClick={handleEditClick}
              />
              <LogBox
                tab={getLabel("snack")}
                meal={getMeal("snack")}
                getCalories={getCalories("snack")}
                onRemoveClick={handleMealRemove}
                onEditClick={handleEditClick}
              />
            </>
          ) : (
            <LogBox
              tab={getLabel(activeTab)}
              meal={getMeal(activeTab)}
              getCalories={getCalories(activeTab)}
              onRemoveClick={handleMealRemove}
              onEditClick={handleEditClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LogMeal;

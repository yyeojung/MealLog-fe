import type { Food, MealPayload, Nutrients } from "@/types/Meal";
import { useEffect, useMemo } from "react";
import EditFoodForm from "./EditFoodForm";
import { Trash2 } from "lucide-react";
import TotalMeal from "./TotalMeal";

type NutrientKey = keyof Pick<Nutrients, "carbs" | "protein" | "fat">;

interface SelectedEditMealProps {
  meals: MealPayload[];
  foods: Food[];
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>;
  isNew?: boolean;
}
const SelectedEditMeal = ({ meals, foods, setFoods, isNew }: SelectedEditMealProps) => {
  const nutrientItem: { key: NutrientKey; label: string }[] = [
    { key: "carbs", label: "탄수화물" },
    { key: "protein", label: "단백질" },
    { key: "fat", label: "지방" },
  ];

  useEffect(() => {
    if (meals[0]?.foods) {
      setFoods(meals[0].foods);
    }
  }, [meals, setFoods]);

  const handleFoodChange = (index: number, field: keyof Food, value: string | number) => {
    setFoods((prev) => prev.map((food, i) => (i === index ? { ...food, [field]: value } : food)));
  };

  const handleNumPlus = (index: number) => {
    setFoods((prev) =>
      prev.map((food, i) =>
        i === index
          ? {
              ...food,
              num: food.num + 1,
            }
          : food,
      ),
    );
  };
  const handleNumMinus = (index: number) => {
    setFoods((prev) =>
      prev.map((food, i) =>
        i === index
          ? {
              ...food,
              num: food.num - 1,
            }
          : food,
      ),
    );
  };

  // 영양소 변경
  const handleNutrientChange = (index: number, nutrient: keyof Nutrients, value: number) => {
    setFoods((prev) =>
      prev.map((food, i) =>
        i === index
          ? {
              ...food,
              nutrients: {
                ...food.nutrients,
                [nutrient]: value,
              },
            }
          : food,
      ),
    );
  };
  const totals = useMemo(() => {
    return foods.reduce(
      (acc, food) => {
        acc.calories += food.calories * food.num;
        acc.nutrients.carbs += food.nutrients.carbs * food.num;
        acc.nutrients.protein += food.nutrients.protein * food.num;
        acc.nutrients.fat += food.nutrients.fat * food.num;
        return acc;
      },
      {
        calories: 0,
        nutrients: {
          carbs: 0,
          protein: 0,
          fat: 0,
        },
      },
    );
  }, [foods]);

  const deleteFood = (index: number) => {
    if (foods.length === 1) {
      setFoods([]);
    } else {
      setFoods((prev) => prev.filter((_, i) => i !== index));
    }
  };
  return (
    <div className="mx-auto max-w-md">
      <div className="px-4">
        <TotalMeal
          calories={totals.calories}
          carbs={totals.nutrients.carbs}
          protein={totals.nutrients.protein}
          fat={totals.nutrients.fat}
        />
        {foods.map((food, index) => (
          <div className="mt-4 flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm" key={index}>
            <EditFoodForm
              food={food}
              index={index}
              nutrientItem={nutrientItem}
              onFoodChange={handleFoodChange}
              onNutrientChange={handleNutrientChange}
              onPlus={handleNumPlus}
              onMinus={handleNumMinus}
            />
            <button
              type="button"
              onClick={() => deleteFood(index)}
              className="flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {isNew && (
          <div className="mt-4 flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm">
            <EditFoodForm
              food={foods[foods.length]}
              index={foods.length}
              nutrientItem={nutrientItem}
              onFoodChange={handleFoodChange}
              onNutrientChange={handleNutrientChange}
              onPlus={handleNumPlus}
              onMinus={handleNumMinus}
            />
            <button
              onClick={() => deleteFood(foods.length)}
              className="flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedEditMeal;

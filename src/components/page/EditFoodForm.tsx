import type { Food, Nutrients } from "@/types/Meal";
import clsx from "clsx";
import { Input, NumberStepper } from "../shared";
import React from "react";

interface NutrientItem {
  key: keyof Nutrients;
  label: string;
}

interface FoodFormProps {
  foods: Food;
  index: number;
  nutrientItem: NutrientItem[];
  onFoodChange: (index: number, field: keyof Food, value: string | number) => void;
  onNutrientChange: (index: number, nutrient: keyof Nutrients, value: number) => void;
  onPlus: (index: number) => void;
  onMinus: (index: number) => void;
}

const EditFoodForm = React.memo(
  ({ foods, index, nutrientItem, onFoodChange, onNutrientChange, onPlus, onMinus }: FoodFormProps) => {
    return (
      <div className="">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex-1">
            {/* 음식 이름 */}
            <Input
              paddingSize="s"
              className="w-40 font-medium text-gray-800"
              value={foods.name}
              onChange={(e) => onFoodChange(index, "name", e.target.value)}
            />
            <div className="flex justify-between">
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                {/* 칼로리 */}
                <Input
                  paddingSize="s"
                  className="w-20 font-medium text-gray-800"
                  value={foods.calories}
                  onChange={(e) => onFoodChange(index, "calories", Number(e.target.value))}
                />
                kcal × {foods.num}개
              </div>
              <NumberStepper
                key={foods.num}
                value={foods.num}
                onPlus={() => onPlus(index)}
                onMinus={() => onMinus(index)}
                options={{
                  min: 1,
                  max: 10,
                  errorMessage: {
                    min: "최소 값에 도달했습니다.",
                    max: "최대 값에 도달했습니다.",
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* 영양소 */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          {nutrientItem.map((nutrient) => (
            <div
              key={nutrient.key}
              className={clsx(
                "rounded p-2 text-center",
                nutrient.label === "탄수화물"
                  ? "bg-orange-50"
                  : nutrient.label === "단백질"
                    ? "bg-green-50"
                    : "bg-purple-50",
              )}
            >
              <span
                className={clsx(
                  nutrient.label === "탄수화물"
                    ? "text-orange-600"
                    : nutrient.label === "단백질"
                      ? "text-green-600"
                      : "text-purple-600",
                )}
              >
                {nutrient.label}
              </span>
              <Input
                paddingSize="s"
                className="mt-2 font-medium"
                value={foods.nutrients[nutrient.key] ?? "-"}
                onChange={(e) => onNutrientChange(index, nutrient.key, Number(e.target.value))}
                suffix="g"
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
);

export default EditFoodForm;

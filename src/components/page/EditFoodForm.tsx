import type { Food, Nutrients } from "@/types/Meal";
import clsx from "clsx";
import { Input, InputNumber, NumberStepper } from "../shared";
import React from "react";

interface NutrientItem {
  key: keyof Nutrients;
  label: string;
}

interface FoodFormProps {
  food?: Food;
  index: number;
  nutrientItem: NutrientItem[];
  onFoodChange: (index: number, field: keyof Food, value: string | number) => void;
  onNutrientChange: (index: number, nutrient: keyof Nutrients, value: number) => void;
  onPlus: (index: number) => void;
  onMinus: (index: number) => void;
}

const EditFoodForm = React.memo(
  ({ food, index, nutrientItem, onFoodChange, onNutrientChange, onPlus, onMinus }: FoodFormProps) => {
    return (
      <div className="">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex-1">
            {/* 음식 이름 */}
            <div className="flex gap-2">
              <Input
                paddingSize="s"
                className="w-40 font-medium text-gray-800"
                value={food?.name}
                onChange={(e) => onFoodChange(index, "name", e.target.value)}
              />
              <span className="text-red-500">*</span>
            </div>
            <div className="flex justify-between">
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                {/* 칼로리 */}
                <InputNumber
                  id="calories"
                  paddingSize="s"
                  className="w-20 font-medium text-gray-800"
                  value={food?.calories ?? 0}
                  setValue={(val) => onFoodChange(index, "calories", val === "" ? 0 : val)}
                />
                kcal × {food?.num}개
              </div>
              <NumberStepper
                key={food?.num}
                value={food?.num ?? 1}
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
              <InputNumber
                id={nutrient.key}
                paddingSize="s"
                className="mt-2 font-medium"
                value={food?.nutrients[nutrient.key] ?? 0}
                setValue={(val) => onNutrientChange(index, nutrient.key, val === "" ? 0 : val)}
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

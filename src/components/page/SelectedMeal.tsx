import clsx from "clsx";

interface SelectedMealProps {
  name: string;
  calories: number;
  nutrients?: {
    carbs: number;
    protein: number;
    fat: number;
  };
  num: number;
}
const SelectedMeal = ({ name, calories, nutrients, num }: SelectedMealProps) => {
  const nutrientItems = [
    {
      label: "탄수화물",
      value: nutrients?.carbs,
    },
    {
      label: "단백질",
      value: nutrients?.protein,
    },
    {
      label: "지방",
      value: nutrients?.fat,
    },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-white p-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex-1">
            <div className="font-medium text-gray-800">{name}</div>
            <div className="text-sm text-gray-600">
              {calories} kcal × {num}개
            </div>
          </div>
          {/* <NumberStepper
            key={num}
            value={num}
            onPlus={onPlus}
            onMinus={onMinus}
            options={{
              min: 1,
              max: 10,
              errorMessage: {
                min: "최소 값에 도달했습니다.",
                max: "최대 값에 도달했습니다.",
              },
            }}
          /> */}
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {nutrientItems.map((item) => (
            <div
              key={item.label}
              className={clsx(
                "rounded p-1 text-center",
                item.label === "탄수화물" ? "bg-orange-50" : item.label === "단백질" ? "bg-green-50" : "bg-purple-50",
              )}
            >
              <span
                className={clsx(
                  item.label === "탄수화물"
                    ? "text-orange-600"
                    : item.label === "단백질"
                      ? "text-green-600"
                      : "text-purple-600",
                )}
              >
                {item.label}
              </span>
              <div className="font-medium">{item.value ?? "-"}g</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectedMeal;

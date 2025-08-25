import { NumberStepper } from "../shared";

interface SelectedMealProps {
  num: number;
  onPlus: () => void;
  onMinus: () => void;
}
const SelectedMeal = ({ num, onPlus, onMinus }: SelectedMealProps) => {
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-white p-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex-1">
            <div className="font-medium text-gray-800">현미밥</div>
            <div className="text-sm text-gray-600">300 kcal × {num}개</div>
          </div>
          <NumberStepper
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
          />
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="rounded bg-orange-50 p-1 text-center">
            <span className="text-orange-600">탄수화물</span>
            <div className="font-medium">65.0g</div>
          </div>
          <div className="rounded bg-green-50 p-1 text-center">
            <span className="text-green-600">단백질</span>
            <div className="font-medium">6.0g</div>
          </div>
          <div className="rounded bg-purple-50 p-1 text-center">
            <span className="text-purple-600">지방</span>
            <div className="font-medium">2.0g</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedMeal;

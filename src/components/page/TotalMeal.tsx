interface TotalMealProps {
  calories: number;
  carbs?: number;
  protein?: number;
  fat?: number;
}

const TotalMeal = ({ calories, carbs, protein, fat }: TotalMealProps) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-3">
        <div className="text-center">
          <div className="mb-1 text-xs text-gray-600">칼로리</div>
          <div className="text-sm font-bold text-gray-800">{calories}</div>
          <div className="text-xs text-gray-500">kcal</div>
        </div>
        <div className="text-center">
          <div className="mb-1 text-xs text-gray-600">탄수화물</div>
          <div className="text-sm font-bold text-orange-600">{carbs ?? "-"}</div>
          <div className="text-xs text-gray-500">g</div>
        </div>
        <div className="text-center">
          <div className="mb-1 text-xs text-gray-600">단백질</div>
          <div className="text-sm font-bold text-green-600">{protein ?? "-"}</div>
          <div className="text-xs text-gray-500">g</div>
        </div>
        <div className="text-center">
          <div className="mb-1 text-xs text-gray-600">지방</div>
          <div className="text-sm font-bold text-purple-600">{fat ?? "-"}</div>
          <div className="text-xs text-gray-500">g</div>
        </div>
      </div>
    </>
  );
};
export default TotalMeal;

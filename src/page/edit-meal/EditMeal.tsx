import SelectedEditMeal from "@/components/page/SelectedEditMeal";
import { Button } from "@/components/shared";
import { deleteMeal, getMyMeal, updateMeal } from "@/features/meal/mealSlice";
import type { AppDispatch, RootState } from "@/features/store";
import PATHS from "@/routes/paths";
import type { Food } from "@/types/Meal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import CloudinaryUploadWidget from "../register-meal/components/CloudinaryUploadWidget";
import { X } from "lucide-react";

interface AddFoodProps extends Food {
  isNew?: boolean;
}

const EditMeal = () => {
  const { meals } = useSelector((state: RootState) => state.meal);
  const [searchParams] = useSearchParams();

  const date = searchParams.get("date");
  const type = searchParams.get("type");
  const [photo, setPhoto] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [foods, setFoods] = useState<AddFoodProps[]>(meals[0]?.foods ?? []);
  const invalidFood = foods.find((item) => !item.name.trim());

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleMemoChange = (value: string) => {
    setMemo(value);
  };
  const handlePhotoUpload = (url: string) => {
    setPhoto(url);
  };
  const handlePhotoClear = () => {
    setPhoto("");
  };
  const handleAddFoodClick = () => {
    if (invalidFood) {
      alert("음식 이름은 필수 입력값입니다.");
      return;
    }

    setFoods((prev) => [
      ...prev,
      {
        _id: "",
        num: 1,
        name: "",
        amount: 0,
        calories: 0,
        nutrients: {
          carbs: 0,
          protein: 0,
          fat: 0,
          sugar: 0,
        },
        isNew: true,
      },
    ]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (foods.length === 0) {
        await dispatch(deleteMeal({ mealId: meals[0]._id! }));
      } else {
        if (invalidFood) {
          alert("음식 이름은 필수 입력값입니다.");
          return;
        }

        // 새 food일 경우 _id를 아예 빼고 보내기
        const cleanedFoods = foods.map((item) => {
          const { _id, ...rest } = item;
          return _id ? item : rest; // 기존 food는 _id 유지, 새 food는 _id 제거
        });
        await dispatch(
          updateMeal({
            mealId: meals[0]._id!,
            data: {
              ...meals[0],
              photo,
              memo,
              foods: cleanedFoods,
            },
          }),
        );
      }
      alert("수정되었습니다!");
      navigate(`${PATHS.LOGMEAL.path}?tab=${type}&date=${date}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (date && type) {
      dispatch(getMyMeal({ date, type }));
    }
  }, [dispatch, date, type]);

  useEffect(() => {
    if (meals.length === 0) {
      setPhoto("");
      setMemo("");
      return;
    }
    setPhoto(meals[0].photo ?? "");
    setMemo(meals[0].memo ?? "");
  }, [meals]);
  return (
    <div className="mx-4 my-6 rounded-lg bg-white py-4">
      <form onSubmit={handleSubmit}>
        <SelectedEditMeal meals={meals} foods={foods} setFoods={setFoods} />
        <div className="px-4">
          <Button size="m" color="gray" className="mt-4" onClick={handleAddFoodClick}>
            음식 추가하기
          </Button>
          <div className="mt-6 rounded-xl border border-white/20 bg-white/90">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">사진 (선택)</h3>
            {photo ? (
              <div className="relative">
                <button
                  type="button"
                  className="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white"
                  onClick={handlePhotoClear}
                >
                  <X size={18} color="#3d3d3d" />
                  <span className="sr-only">이미지 삭제</span>
                </button>
                <img src={photo} alt="photo" />
              </div>
            ) : (
              <CloudinaryUploadWidget uploadImage={handlePhotoUpload} />
            )}
          </div>
          <div className="mt-6 rounded-xl border border-white/20 bg-white/90">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">메모 (선택)</h3>
            <textarea
              placeholder="음식에 대한 메모를 남겨보세요 (예: 맛, 양, 특별한 점 등)"
              className="h-32 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
              maxLength={500}
              value={memo}
              onChange={(e) => handleMemoChange(e.target.value)}
            ></textarea>
            <div className="mt-2 text-right text-xs text-gray-500">{memo.length}/500</div>
          </div>
          <Button type="submit" size="m" className="mt-4">
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditMeal;

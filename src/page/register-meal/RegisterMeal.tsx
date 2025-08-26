import { Cake, Moon, Save, Search, Sun, Sunrise, X } from "lucide-react";
import { Button, ContentCard, Input, Label, OptionButtons } from "@/components/shared";
import { useState } from "react";
import CloudinaryUploadWidget from "@/page/register-meal/components/CloudinaryUploadWidget";
import SelectedMeal from "@/components/page/SelectedMeal";
import { useDispatch } from "react-redux";
import { createMeal } from "@/features/meal/mealSlice";
import type { AppDispatch } from "@/features/store";
import type { MealPayload, MEALTYPE } from "@/types/Meal";

// const InitialFormData = {
//   num: 0,
//   name: "", // 음식 이름
//   amount: 0, // 섭취량 (그램)
//   calories: 0, // 칼로리
//   nutrients: {
//     carbs: 0, // 탄수화물
//     protein: 0, // 단백질
//     fat: 0, // 지방
//     sugar: 0, // 당류
//   },
//   photo: "", // 이미지 URL주소
//   memo: "", // 식사 메모
// };

interface Nutrients {
  carbs: number; // 탄수화물
  protein: number; // 단백질
  fat: number; // 지방
  sugar: number; // 당류
}

const RegisterMeal = () => {
  const [isCustomInput /*setIsCustomInput*/] = useState(true);
  // const [formData, setFormData] = useState(InitialFormData);
  const [selectedMealTab, setSelectedMealTab] = useState<MEALTYPE>("breakfast");
  const [num, setNum] = useState<number>(0);
  const [name, setName] = useState<string>("");
  // const [amount, setAmount] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [nutrients, setNutrients] = useState<Nutrients>({
    carbs: 0,
    protein: 0,
    fat: 0,
    sugar: 0,
  });
  const [photo, setPhoto] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const items = [
    {
      label: "아침",
      onClick: () => {
        setSelectedMealTab("breakfast");
      },
      active: selectedMealTab === "breakfast",
      icons: {
        default: <Sunrise size={24} color="gray" />,
        active: <Sunrise size={24} className="text-blue-500" />,
      },
    },
    {
      label: "점심",
      onClick: () => {
        setSelectedMealTab("lunch");
      },
      active: selectedMealTab === "lunch",
      icons: {
        default: <Sun size={24} color="gray" />,
        active: <Sun size={24} className="text-blue-500" />,
      },
    },
    {
      label: "저녁",
      onClick: () => {
        setSelectedMealTab("dinner");
      },
      active: selectedMealTab === "dinner",
      icons: {
        default: <Moon size={24} color="gray" />,
        active: <Moon size={24} className="text-blue-500" />,
      },
    },
    {
      label: "간식",
      onClick: () => {
        setSelectedMealTab("snack");
      },
      active: selectedMealTab === "snack",
      icons: {
        default: <Cake size={24} color="gray" />,
        active: <Cake size={24} className="text-blue-500" />,
      },
    },
  ];
  // const toggleCustomInput = () => {
  //   setIsCustomInput((prev) => !prev);
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (mode === "new") {
    //새 상품 만들기
    const mealPayload: MealPayload = {
      userId: "68ada9ec4cc1b5e3aadcfee0",
      date: new Date(),
      type: "breakfast",
      foods: [
        {
          num,
          name,
          amount: 200,
          calories,
          nutrients,
        },
      ],
      photo,
      memo,
    };
    dispatch(createMeal(mealPayload));
    // } else {
    //   // 상품 수정하기
    //   dispatch(editProduct({ ...formData, /*stock*/ id: selectedProduct._id }));
    // }
  };

  const handleFoodNameChange = (value: string) => {
    setName(value);
  };
  const handleCaloriesChange = (value: string) => {
    setCalories(Number(value));
  };
  const handleCarbsChange = (value: string) => {
    setNutrients({
      ...nutrients,
      carbs: Number(value),
    });
  };
  const handleProteinChange = (value: string) => {
    setNutrients({
      ...nutrients,
      protein: Number(value),
    });
  };
  const handleFatChange = (value: string) => {
    setNutrients({
      ...nutrients,
      fat: Number(value),
    });
  };
  const handlePhotoUpload = (url: string) => {
    //이미지 업로드
    setPhoto(url);
  };
  const handlePhotoClear = () => {
    setPhoto("");
  };
  const handleMemoChange = (value: string) => {
    setMemo(value);
  };

  return (
    <div className="px-4 py-6">
      <form onSubmit={handleSubmit}>
        <ContentCard heading={<Label htmlFor="content">식사 분류</Label>}>
          <OptionButtons items={items} />
        </ContentCard>
        <div className="mt-4 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">선택된 음식</h3>
            <div className="text-sm font-medium text-blue-600">총 300 kcal</div>
          </div>
          <div className="mb-4 grid grid-cols-4 gap-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-3">
            <div className="text-center">
              <div className="mb-1 text-xs text-gray-600">칼로리</div>
              <div className="text-sm font-bold text-gray-800">300</div>
              <div className="text-xs text-gray-500">kcal</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-xs text-gray-600">탄수화물</div>
              <div className="text-sm font-bold text-orange-600">65.0</div>
              <div className="text-xs text-gray-500">g</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-xs text-gray-600">단백질</div>
              <div className="text-sm font-bold text-green-600">6.0</div>
              <div className="text-xs text-gray-500">g</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-xs text-gray-600">지방</div>
              <div className="text-sm font-bold text-purple-600">2.0</div>
              <div className="text-xs text-gray-500">g</div>
            </div>
          </div>
          <SelectedMeal
            num={num}
            onPlus={() => setNum((prev) => prev + 1)}
            onMinus={() => setNum((prev) => prev - 1)}
          />
        </div>
        <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
          <div className="flex justify-between">
            <Label required htmlFor="food">
              음식 이름
            </Label>
            {/* <button
              className="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-sm whitespace-nowrap text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
              onClick={toggleCustomInput}
            >
              {isCustomInput ? "검색으로 추가" : "직접 추가"}
            </button> */}
          </div>
          <Input
            id="food"
            placeholder="이름을 입력해주세요."
            suffix={isCustomInput ? undefined : <Search size={16} color="gray" />}
            className="mt-4"
            onChange={(e) => handleFoodNameChange(e.target.value)}
          />
        </div>
        {isCustomInput && (
          <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
            <Label required htmlFor="calories">
              칼로리
            </Label>
            <Input
              id="calories"
              placeholder="칼로리를 입력해주세요."
              color="gray"
              className="mt-4"
              type="number"
              onChange={(e) => handleCaloriesChange(e.target.value)}
            />
          </div>
        )}
        {isCustomInput && (
          <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
            <Label htmlFor="nutritional">탄단지</Label>
            <div className="grid grid-cols-3 gap-2 pt-4">
              <Input
                id="nutritional"
                placeholder="탄수화물"
                color="gray"
                type="number"
                onChange={(e) => handleCarbsChange(e.target.value)}
              />
              <Input
                placeholder="단백질"
                color="gray"
                type="number"
                onChange={(e) => handleProteinChange(e.target.value)}
              />
              <Input placeholder="지방" color="gray" type="number" onChange={(e) => handleFatChange(e.target.value)} />
            </div>
          </div>
        )}
        <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">사진 (선택)</h3>
          {photo ? (
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-2">
              <div className="relative h-48">
                <button
                  type="button"
                  className="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white"
                  onClick={handlePhotoClear}
                >
                  <X size={18} color="#3d3d3d" />
                  <span className="sr-only">이미지 삭제</span>
                </button>
                <img src={photo} className="h-full w-auto rounded-lg object-contain" />
              </div>
            </div>
          ) : (
            <CloudinaryUploadWidget uploadImage={handlePhotoUpload} />
          )}
        </div>
        <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">메모 (선택)</h3>
          <textarea
            placeholder="음식에 대한 메모를 남겨보세요 (예: 맛, 양, 특별한 점 등)"
            className="h-32 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
            maxLength={500}
            onChange={(e) => handleMemoChange(e.target.value)}
          ></textarea>
          <div className="mt-2 text-right text-xs text-gray-500">0/500</div>
        </div>
        <Button type="submit" className="mt-6" size="m">
          <Save color="white" size={20} />
          식단 저장하기
        </Button>
      </form>
    </div>
  );
};
export default RegisterMeal;

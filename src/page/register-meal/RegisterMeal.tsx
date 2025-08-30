import { Cake, Moon, Save, Search, SquarePen, Sun, Sunrise, X } from "lucide-react";
import { Button, ContentCard, Input, InputNumber, Label, OptionButtons, TextButton } from "@/components/shared";
import { useEffect, useState } from "react";
import CloudinaryUploadWidget from "@/page/register-meal/components/CloudinaryUploadWidget";
import SelectedMeal from "@/components/page/SelectedMeal";
import { useDispatch, useSelector } from "react-redux";
import { createMeal, getMyMeal } from "@/features/meal/mealSlice";
import type { AppDispatch, RootState } from "@/features/store";
import type { MealPayload, MEALTYPE } from "@/types/Meal";
import type { InputNumberValueType } from "@/components/shared/InputNumber";
import TotalMeal from "@/components/page/TotalMeal";
import EditModal from "./components/EditModal";
import { USER_INFO } from "@/utils/token";

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

const RegisterMeal = () => {
  const [isCustomInput /*setIsCustomInput*/] = useState(true);
  // const [formData, setFormData] = useState(InitialFormData);
  const [selectedMealTab, setSelectedMealTab] = useState<MEALTYPE>("breakfast");
  const [name, setName] = useState<string>("");
  // const [amount, setAmount] = useState<number>(0);
  const [calories, setCalories] = useState<InputNumberValueType>(0);
  const [carbs, setCarbs] = useState<InputNumberValueType>(0);
  const [protein, setProtein] = useState<InputNumberValueType>(0);
  const [fat, setFat] = useState<InputNumberValueType>(0);
  const [photo, setPhoto] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const resetForm = () => {
    setName("");
    setCalories(0);
    setCarbs(0);
    setProtein(0);
    setFat(0);
  };

  const today = new Date();
  const isoDate = today.toISOString().split("T")[0];
  useEffect(() => {
    dispatch(getMyMeal({ date: isoDate, type: selectedMealTab }));
  }, [dispatch, selectedMealTab, isoDate]);

  const { meals, totals } = useSelector((state: RootState) => state.meal);

  const handleSelectedMealTab = (type: MEALTYPE) => {
    setSelectedMealTab(type);
    resetForm();
    setMemo("");
    setPhoto("");
  };
  const items = [
    {
      label: "아침",
      onClick: () => handleSelectedMealTab("breakfast"),
      active: selectedMealTab === "breakfast",
      icons: {
        default: <Sunrise size={24} color="gray" />,
        active: <Sunrise size={24} className="text-blue-500" />,
      },
    },
    {
      label: "점심",
      onClick: () => handleSelectedMealTab("lunch"),
      active: selectedMealTab === "lunch",
      icons: {
        default: <Sun size={24} color="gray" />,
        active: <Sun size={24} className="text-blue-500" />,
      },
    },
    {
      label: "저녁",
      onClick: () => handleSelectedMealTab("dinner"),
      active: selectedMealTab === "dinner",
      icons: {
        default: <Moon size={24} color="gray" />,
        active: <Moon size={24} className="text-blue-500" />,
      },
    },
    {
      label: "간식",
      onClick: () => handleSelectedMealTab("snack"),
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (mode === "new") {
    //새 상품 만들기
    if (!name) return alert("음식 이름을 입력해주세요.");

    const mealPayload: MealPayload = {
      userId: USER_INFO()._id,
      date: isoDate,
      type: selectedMealTab,
      foods: [
        {
          num: 1,
          name,
          amount: 200,
          calories: Number(calories),
          nutrients: {
            carbs: Number(carbs),
            protein: Number(protein),
            fat: Number(fat),
            sugar: 0,
          },
        },
      ],
      photo,
      memo,
    };
    try {
      await dispatch(createMeal(mealPayload));
      alert("추가 됐습니다!");
      resetForm();
      await dispatch(getMyMeal({ date: isoDate, type: selectedMealTab }));
    } catch (error) {
      console.log(error);
    }
    // } else {
    //   // 상품 수정하기
    //   dispatch(editProduct({ ...formData, /*stock*/ id: selectedProduct._id }));
    // }
  };

  const handleFoodNameChange = (value: string) => {
    setName(value);
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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (meals.length > 0) {
      setMemo(meals[0].memo ?? "");
      setPhoto(meals[0].photo ?? "");
    }
  }, [meals]);
  return (
    <>
      <div className="px-4 py-6">
        <form onSubmit={handleSubmit}>
          <ContentCard heading={<Label htmlFor="content">식사 분류</Label>}>
            <OptionButtons items={items} />
          </ContentCard>
          {meals.length > 0 && (
            <div className="mt-4 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">선택된 음식</h3>
                <TextButton type="button" onClick={handleOpenModal}>
                  <SquarePen color="blue" size={16} /> 수정하기
                </TextButton>
              </div>
              <TotalMeal calories={totals.calories} carbs={totals.carbs} protein={totals.protein} fat={totals.fat} />
              <div className="flex flex-col gap-3">
                {meals[0].foods.map((item) => (
                  <SelectedMeal
                    key={item._id}
                    name={item.name}
                    calories={item.calories}
                    nutrients={item.nutrients}
                    num={item.num}
                  />
                ))}
              </div>
            </div>
          )}
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
              value={name}
              onChange={(e) => handleFoodNameChange(e.target.value)}
            />
          </div>
          {isCustomInput && (
            <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
              <Label htmlFor="calories">칼로리</Label>
              <InputNumber
                id="calories"
                placeholder="칼로리를 입력해주세요."
                className="mt-4"
                value={calories}
                suffix={"kcal"}
                setValue={setCalories}
              />
            </div>
          )}
          {isCustomInput && (
            <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
              <Label htmlFor="carbs">탄단지</Label>
              <div className="grid grid-cols-3 gap-2 pt-4">
                <InputNumber
                  id="carbs"
                  placeholder="탄수화물"
                  color="gray"
                  suffix={"g"}
                  value={carbs}
                  setValue={setCarbs}
                />
                <InputNumber
                  id="protein"
                  placeholder="단백질"
                  color="gray"
                  suffix={"g"}
                  value={protein}
                  setValue={setProtein}
                />
                <InputNumber id="fat" placeholder="지방" color="gray" suffix={"g"} value={fat} setValue={setFat} />
              </div>
            </div>
          )}
          <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">사진 (선택)</h3>
            {photo ? (
              <div className="relative flex h-48 items-center justify-center border-2 border-dashed border-gray-300 p-2">
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
              value={memo}
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
      <EditModal
        isoDate={isoDate}
        selectedMealTab={selectedMealTab}
        mealList={meals}
        open={openModal}
        setOpen={setOpenModal}
      />
    </>
  );
};
export default RegisterMeal;

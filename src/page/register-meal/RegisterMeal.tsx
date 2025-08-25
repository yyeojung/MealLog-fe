import { Cake, Moon, Save, Search, Sun, Sunrise } from "lucide-react";
import { Button, ContentCard, Input, Label, OptionButtons } from "@/components/shared";
import { useState } from "react";
import CloudinaryUploadWidget from "@/page/register-meal/components/CloudinaryUploadWidget";
import SelectedMeal from "@/components/page/SelectedMeal";

const InitialFormData = {
  num: 0,
  name: "", // 음식 이름
  amount: 0, // 섭취량 (그램)
  calories: 0, // 칼로리
  nutrients: {
    carbs: 0, // 탄수화물
    protein: 0, // 단백질
    fat: 0, // 지방
    sugar: 0, // 당류
  },
  photo: "", // 이미지 URL주소
  memo: "", // 식사 메모
};

const RegisterMeal = () => {
  const [selectedMealTab, setSelectedMealTab] = useState("아침");
  const [num, setNum] = useState<number>(1);
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [formData, setFormData] = useState(InitialFormData);

  const items = [
    {
      label: "아침",
      onClick: () => {
        setSelectedMealTab("아침");
      },
      active: selectedMealTab === "아침",
      icons: {
        default: <Sunrise size={24} color="gray" />,
        active: <Sunrise size={24} className="text-blue-500" />,
      },
    },
    {
      label: "점심",
      onClick: () => {
        setSelectedMealTab("점심");
      },
      active: selectedMealTab === "점심",
      icons: {
        default: <Sun size={24} color="gray" />,
        active: <Sun size={24} className="text-blue-500" />,
      },
    },
    {
      label: "저녁",
      onClick: () => {
        setSelectedMealTab("저녁");
      },
      active: selectedMealTab === "저녁",
      icons: {
        default: <Moon size={24} color="gray" />,
        active: <Moon size={24} className="text-blue-500" />,
      },
    },
    {
      label: "간식",
      onClick: () => {
        setSelectedMealTab("간식");
      },
      active: selectedMealTab === "간식",
      icons: {
        default: <Cake size={24} color="gray" />,
        active: <Cake size={24} className="text-blue-500" />,
      },
    },
  ];
  const toggleCustomInput = () => {
    setIsCustomInput((prev) => !prev);
  };
  const uploadImage = (url: string) => {
    //이미지 업로드
    setFormData({ ...formData, photo: url });
  };
  return (
    <div className="px-4 py-6">
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
        <SelectedMeal num={num} onPlus={() => setNum((prev) => prev + 1)} onMinus={() => setNum((prev) => prev - 1)} />
      </div>
      <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
        <div className="flex justify-between">
          <Label required htmlFor="food">
            음식 이름
          </Label>
          <button
            className="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-sm whitespace-nowrap text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            onClick={toggleCustomInput}
          >
            {isCustomInput ? "검색으로 추가" : "직접 추가"}
          </button>
        </div>
        <Input
          id="food"
          placeholder="이름을 입력해주세요."
          suffix={<Search size={16} color="gray" />}
          className="mt-4"
        />
      </div>
      {isCustomInput && (
        <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
          <Label required htmlFor="calories">
            칼로리
          </Label>
          <Input id="calories" placeholder="칼로리를 입력해주세요." color="gray" className="mt-4" />
        </div>
      )}
      {isCustomInput && (
        <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
          <Label htmlFor="nutritional">탄단지</Label>
          <div className="grid grid-cols-3 gap-2">
            <Input id="nutritional" placeholder="탄수화물" color="gray" className="mt-4" />
            <Input placeholder="단백질" color="gray" className="mt-4" />
            <Input placeholder="지방" color="gray" className="mt-4" />
          </div>
        </div>
      )}
      <CloudinaryUploadWidget uploadImage={uploadImage} />
      <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">메모 (선택)</h3>
        <textarea
          placeholder="음식에 대한 메모를 남겨보세요 (예: 맛, 양, 특별한 점 등)"
          className="h-32 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
          maxLength={500}
        ></textarea>
        <div className="mt-2 text-right text-xs text-gray-500">0/500</div>
      </div>
      <Button className="mt-6" size="m">
        <Save color="white" size={20} />
        식단 저장하기
      </Button>
    </div>
  );
};
export default RegisterMeal;

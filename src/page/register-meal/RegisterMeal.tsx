import { Cake, Moon, Search, Sun, Sunrise } from "lucide-react";
import { ContentCard, Input, Label, OptionButtons } from "@/components/shared";
import { useState } from "react";

const RegisterMeal = () => {
  const [selectedMealTab, setSelectedMealTab] = useState("아침");
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
  return (
    <div className="px-4 py-6">
      <ContentCard heading={<Label htmlFor="content">식사 분류</Label>}>
        <OptionButtons items={items} />
      </ContentCard>
      <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          음식 이름 <span className="text-red-500">*</span>
        </h3>
        <Input placeholder="이름을 입력해주세요." suffix={<Search size={16} color="gray" />} />
      </div>
      <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">메모 (선택)</h3>
        <textarea
          placeholder="음식에 대한 메모를 남겨보세요 (예: 맛, 양, 특별한 점 등)"
          className="h-32 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none"
          maxLength={500}
        ></textarea>
        <div className="mt-2 text-right text-xs text-gray-500">0/500</div>
      </div>
    </div>
  );
};
export default RegisterMeal;

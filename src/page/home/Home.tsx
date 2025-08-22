import { Avatar, Tabs } from "@/components/shared";
import HomeDaily from "./HomeDaily";
import HomeMonthly from "./HomeMonthly";
import { Settings, User } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [activeTab, setActiveTab] = useState("일일");

  const tabs = [
    {
      label: "일일",
      onClick: () => {
        setActiveTab("일일");
      },
      active: activeTab === "일일",
    },
    {
      label: "월별",
      onClick: () => {
        setActiveTab("월별");
      },
      active: activeTab === "월별",
    },
  ];
  return (
    <>
      <div className="border-b border-gray-100/50 bg-white/80 px-6 py-6 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Avatar size="m">
              <User size={24} color="white" />
            </Avatar>
            <div>
              <h2 className="text-lg font-bold text-gray-800">건강한 민지</h2>
              {/* <GradationBadge size="s">레벨 7 다이어트 실력자</GradationBadge> */}
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
            <Settings color="#4b5563" width={20} height={20} />
          </div>
        </div>
        <div className="text-center">
          <h1 className="mb-1 text-xl font-bold text-gray-800">다이어트 기록</h1>
          <p className="text-sm text-gray-600">2025년 8월 20일</p>
        </div>
      </div>
      <div className="px-4 py-6">
        <Tabs items={tabs} />
        <div className="mt-4">
          {activeTab === "일일" && <HomeDaily />}
          {activeTab === "월별" && <HomeMonthly />}
        </div>
      </div>
    </>
  );
};

export default Home;

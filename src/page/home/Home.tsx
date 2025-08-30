import { Avatar, Tabs } from "@/components/shared";
import HomeDaily from "./HomeDaily";
import HomeMonthly from "./HomeMonthly";
import { Settings } from "lucide-react";
import { useState } from "react";
import { USER_INFO } from "@/utils/token";
import PATHS from "@/routes/paths";
import { useNavigate } from "react-router-dom";

const today = new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });

const Home = () => {
  const navigate = useNavigate();

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
              <img
                src={USER_INFO()?.picture}
                alt="user"
                className="h-full w-full object-cover"
                width={48}
                height={48}
                loading="eager"
                decoding="async"
              />
            </Avatar>
            <div>
              <h2 className="text-lg font-bold text-gray-800">{USER_INFO()?.name}</h2>
              {/* <GradationBadge size="s">레벨 7 다이어트 실력자</GradationBadge> */}
            </div>
          </div>
          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200"
            onClick={() => {
              navigate(PATHS.SETUP.path);
            }}
          >
            <Settings color="#4b5563" width={20} height={20} />
          </button>
        </div>
        <div className="text-center">
          <h1 className="mb-1 text-xl font-bold text-gray-800">다이어트 기록</h1>
          {activeTab === "일일" ? <p className="text-sm text-gray-600">{today}</p> : ""}
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

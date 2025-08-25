import { Tabs } from "@/components/shared";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LogBox from "./components/LogBox";
import KcalBox from "./components/KcalBox";

const LogMeal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(searchParams.get("tab") || "");

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  const tabs = useMemo(
    () => [
      {
        label: "전체",
        onClick: () => setActiveTab("전체"),
        active: activeTab === "전체",
      },
      {
        label: "아침",
        onClick: () => setActiveTab("아침"),
        active: activeTab === "아침",
      },

      {
        label: "점심",
        onClick: () => setActiveTab("점심"),
        active: activeTab === "점심",
      },

      {
        label: "저녁",
        onClick: () => setActiveTab("저녁"),
        active: activeTab === "저녁",
      },
      {
        label: "간식",
        onClick: () => setActiveTab("간식"),
        active: activeTab === "간식",
      },
    ],
    [activeTab],
  );

  return (
    <div className="flex flex-col gap-4 p-6">
      <Tabs items={tabs} />
      <KcalBox tab={activeTab} />
      {activeTab === "전체" ? (
        <>
          <LogBox tab="아침" />
          <LogBox tab="점심" />
          <LogBox tab="저녁" />
        </>
      ) : (
        <LogBox tab={activeTab} />
      )}
    </div>
  );
};

export default LogMeal;

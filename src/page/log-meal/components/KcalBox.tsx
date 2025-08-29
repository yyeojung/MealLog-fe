import { Button, Label, LoadingSection } from "@/components/shared";
import useApi from "@/hooks/useApi";
import type { Feedback } from "@/types/Feedback";
import { addComma } from "@/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  tab: string;
  calories: number;
  date: string;
}

const KcalBox = ({ tab, calories, date }: Props) => {
  const [searchParams] = useSearchParams();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const DATE = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const MEAL_TYPE = searchParams.get("tab");

  const createFeedBack = useApi();
  const getFeedBack = useApi();

  const handleCreateFeedBack = () => {
    createFeedBack.request({
      method: "post",
      url: `/openai/feedback?date=${DATE}&type=${MEAL_TYPE}`,
      onSuccess: (res) => {
        setFeedback(res?.feedback?.feedback || null);
      },
    });
  };

  const handleGetFeedBack = () => {
    getFeedBack.request({
      method: "get",
      url: `/openai/feedback?date=${DATE}&type=${MEAL_TYPE}`,
      onSuccess: (res) => {
        setFeedback(res?.feedbacks[0]?.feedback || null);
      },
    });
  };

  useEffect(() => {
    handleGetFeedBack();
  }, [DATE, MEAL_TYPE]);

  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/90 p-6 text-center shadow-lg backdrop-blur-sm">
        <div className="mb-3 text-sm font-bold text-gray-600">{date}</div>
        <div className="mb-3 text-sm font-medium text-gray-600">총 {tab} 칼로리</div>
        <div className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
          {addComma(calories)}
          <span className="ml-2 text-xl text-gray-500">kcal</span>
        </div>

        {/* <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
        <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>목표 대비 77%
      </div> */}
      </div>
      {calories <= 0 ? (
        <div className="rounded-2xl border border-white/20 bg-white/90 p-6 text-center text-sm text-gray-500 shadow-lg backdrop-blur-sm">
          섭취한 {tab === "전체" ? "음식" : tab}이 없습니다.
        </div>
      ) : (
        <Button onClick={handleCreateFeedBack} disabled={createFeedBack.loading}>
          {createFeedBack.loading ? "🍚 평가중..." : "🍚 AI로 평가받기"}
        </Button>
      )}

      {createFeedBack.loading || getFeedBack.loading ? (
        <LoadingSection />
      ) : feedback?.nutritionBalance || feedback?.goodPoints || feedback?.badPoints ? (
        <div className="flex flex-col justify-center gap-2 rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
          <h3 className="mb-3 text-center text-xl font-bold">✨ AI 피드백 ✨</h3>
          <div className="flex flex-col gap-4">
            {Object.keys(feedback).map((key, index) => {
              return (
                <div key={index}>
                  <Label>
                    {key === "nutritionBalance" ? "⚖️ 영양 균형" : key === "goodPoints" ? "👍 잘한 점" : "🍀 개선점"}
                  </Label>
                  <p>{feedback[key as keyof Feedback]}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default KcalBox;

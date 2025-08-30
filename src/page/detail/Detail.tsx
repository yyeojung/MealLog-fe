import { Label, LoadingDot, Tabs } from "@/components/shared";
import useApi from "@/hooks/useApi";
import type { Feedback } from "@/types/Feedback";
import { useEffect, useState } from "react";

const Detail = () => {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const createFeedBack = useApi();
  const getFeedBack = useApi();

  const handleCreateFeedBack = () => {
    createFeedBack.request({
      method: "post",
      url: `/openai/feedback?mode=weekly`,
      onSuccess: (res) => {
        setFeedback(res?.feedback?.feedback || null);
      },
    });
  };

  const handleGetFeedBack = () => {
    getFeedBack.request({
      method: "get",
      url: `/openai/feedback?mode=weekly`,
      onSuccess: (res) => {
        const existingFeedback = res?.feedbacks[0]?.feedback || null;
        setFeedback(existingFeedback);
        if (!existingFeedback) {
          handleCreateFeedBack();
        }
      },
    });
  };

  useEffect(() => {
    handleGetFeedBack();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6">
      <Tabs
        items={[
          {
            label: "주간",
            onClick: () => {},
            active: true,
          },
        ]}
      />

      {(createFeedBack.loading || getFeedBack.loading) && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/90 p-6 align-middle shadow-lg backdrop-blur-sm">
          <p className="text-center">AI가 주간 피드백을 분석중입니다.</p> <LoadingDot />
        </div>
      )}

      {feedback && (
        <div className="flex flex-col justify-center gap-2 rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
          <h3 className="mb-3 text-center text-xl font-bold">✨ AI 피드백 ✨</h3>
          <div className="flex flex-col gap-4">
            <div>
              <Label>📆 기간</Label>
              <p>
                {new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split("T")[0]} (
                {new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString("ko-KR", {
                  weekday: "short",
                })}
                ) ~ {new Date().toISOString().split("T")[0]} (
                {new Date().toLocaleDateString("ko-KR", { weekday: "short" })})
              </p>
            </div>
            {Object.keys(feedback).map((key, index) => {
              const text = String(feedback[key as keyof Feedback]);
              const lines =
                key === "nutritionBalance"
                  ? text.split(/(?<=\.)/).filter((line) => line.trim() !== "")
                  : text.split("-").filter((line) => line.trim() !== "");

              return (
                <div key={index}>
                  <Label>
                    {key === "nutritionBalance" ? "⚖️ 영양 균형" : key === "goodPoints" ? "👍 잘한 점" : "🍀 개선점"}
                  </Label>
                  {lines.map((line, i) => (
                    <p key={i}>{line.trim()}</p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Detail;

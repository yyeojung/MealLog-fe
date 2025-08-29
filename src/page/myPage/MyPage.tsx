import { Avatar, Button } from "@/components/shared";
import { addComma, calculateAge } from "@/utils";
import { USER_INFO } from "@/utils/token";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="px-4 py-6">
      <div className="rounded-xl border border-white/20 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <Avatar size="l">
            <img src={USER_INFO.picture} alt="profile" />
          </Avatar>
          <h2 className="text-xl font-bold text-gray-800">{USER_INFO.name}</h2>
          {/* <GradationBadge size="m">레벨 7 다이어트 실력자</GradationBadge> */}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-3 text-center">
            <div className="mb-1 text-2xl font-bold text-green-600">{USER_INFO.gender === "male" ? "남" : "여"}</div>
            <div className="text-sm text-gray-600">성별</div>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 p-3 text-center">
            <div className="mb-1 text-2xl font-bold text-purple-600">{addComma(USER_INFO.goalCalories)}kcal</div>
            <div className="text-sm text-gray-600">목표 칼로리</div>
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">체중 관리</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">현재 체중</span>
            <span className="text-lg font-bold text-blue-600">{USER_INFO.weight}kg</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">목표 체중</span>
            <span className="text-lg font-bold text-green-600">{USER_INFO.goalWeight}kg</span>
          </div>
          {USER_INFO.weight - USER_INFO.goalWeight > 0 ? (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">남은 감량</span>
              <span className="text-lg font-bold text-orange-600">{USER_INFO.weight - USER_INFO.goalWeight}kg</span>
            </div>
          ) : (
            <div className="rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 p-3 text-center">
              <div className="text-lg font-bold text-purple-600">목표달성👏🏼</div>
            </div>
          )}
        </div>
        {/* <div className="mt-4">
          <div className="mb-2 flex justify-between text-sm text-gray-600">
            <span>진행률</span>
            <span>77%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
              style={{ width: "76.6667%" }}
            ></div>
          </div>
        </div> */}
      </div>
      <div className="mt-4 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">기본 정보</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 p-3 text-center">
            <div className="mb-1 text-lg font-bold text-gray-800">{USER_INFO.height}cm</div>
            <div className="text-sm text-gray-600">키</div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 text-center">
            <div className="mb-1 text-lg font-bold text-gray-800">{calculateAge(USER_INFO.birthDate)}세</div>
            <div className="text-sm text-gray-600">나이</div>
          </div>
        </div>
      </div>
      <Button onClick={handleLogout} className="mt-4">
        로그아웃
      </Button>
    </div>
  );
};
export default MyPage;

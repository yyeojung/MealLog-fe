import clsx from "clsx";
import { Hamburger, Moon, SunMedium, Sunrise } from "lucide-react";

interface Props {
  tab: string;
}

const LogBox = ({ tab }: Props) => {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/90 p-5 shadow-lg backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={clsx(
              "mr-3 flex h-12 w-12 items-center justify-center rounded-xl border",
              tab === "아침" && "border-yellow-200 bg-yellow-100",
              tab === "점심" && "border-orange-200 bg-orange-100",
              tab === "저녁" && "border-purple-200 bg-purple-100",
              tab === "간식" && "border-green-200 bg-green-100",
            )}
          >
            {tab === "아침" && <Sunrise className="text-yellow-600" />}
            {tab === "점심" && <SunMedium className="text-orange-600" />}
            {tab === "저녁" && <Moon className="text-purple-600" />}
            {tab === "간식" && <Hamburger className="text-green-600" />}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{tab}</h3>
            <p className="text-sm text-gray-600">375 kcal</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">3개 음식</div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white/70 px-4 py-3">
          <div className="flex items-center">
            <div className="mr-3 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <span className="font-medium text-gray-800">현미밥</span>
          </div>
          <div className="text-sm font-semibold text-gray-700">
            300 <span className="text-gray-500">kcal</span>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white/70 px-4 py-3">
          <div className="flex items-center">
            <div className="mr-3 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <span className="font-medium text-gray-800">된장국</span>
          </div>
          <div className="text-sm font-semibold text-gray-700">
            50 <span className="text-gray-500">kcal</span>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white/70 px-4 py-3">
          <div className="flex items-center">
            <div className="mr-3 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <span className="font-medium text-gray-800">김치</span>
          </div>
          <div className="text-sm font-semibold text-gray-700">
            25 <span className="text-gray-500">kcal</span>
          </div>
        </div>
      </div>
      <a className="mt-4 block" href="/preview/abe4f2e7-c5b6-4ee9-a94e-b7ee0eaa75b8/1864035/add-meal/breakfast">
        <div className="cursor-pointer rounded-xl border-2 border-dashed border-blue-200 py-3 text-center text-sm font-medium whitespace-nowrap text-blue-600 transition-colors hover:bg-blue-50">
          <i className="ri-add-line mr-1"></i>음식 추가하기
        </div>
      </a>
    </div>
  );
};

export default LogBox;

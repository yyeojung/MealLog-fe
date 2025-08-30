import { USER_INFO } from "@/utils/token";

const PATHS = {
  HOME: {
    path: "/",
    title: "홈",
  },
  LOGIN: {
    path: "/login",
    title: "로그인",
  },
  SETUP: {
    path: "/setup",
    title: USER_INFO()?.status === "pending" ? "정보 입력" : "정보 수정",
  },
  LOGMEAL: {
    path: "/log-meal",
    title: "식단 기록",
  },
  REGISTERMEAL: {
    path: "/register-meal",
    title: "식단 추가",
  },
  EDITMEAL: {
    path: "/edit-meal",
    title: "식단 수정",
  },
  DETAIL: {
    path: "/detail",
    title: "상세 분석",
  },
  COMMUNITY: {
    path: "/community",
    title: "커뮤니티",
  },
  MYPAGE: {
    path: "/my-page",
    title: "내 프로필",
  },
  COMPONENTS: {
    path: "/sample",
    title: "컴포넌트",
  },
} as const;

export default PATHS;

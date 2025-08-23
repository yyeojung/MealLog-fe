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
    title: "정보 입력",
  },
  REGISTERMEAL: {
    path: "/register-meal",
    title: "식단 추가",
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
    path: "/components",
    title: "컴포넌트",
  },
} as const;

export default PATHS;

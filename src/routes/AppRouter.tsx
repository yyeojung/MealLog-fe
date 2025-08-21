import { Route, Routes } from "react-router-dom";
import Home from "../page/home/Home";
import PATHS from "./paths";
import Sample from "../components/shared/Sample";
import Detail from "@/page/detail/Detail";
import Community from "@/page/community/Community";
import MyPage from "@/page/myPage/MyPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={PATHS.DETAIL.path} element={<Detail />} />
      <Route path={PATHS.COMMUNITY.path} element={<Community />} />
      <Route path={PATHS.MYPAGE.path} element={<MyPage />} />
      <Route path={PATHS.COMPONENTS.path} element={<Sample />} />
    </Routes>
  );
};

export default AppRouter;

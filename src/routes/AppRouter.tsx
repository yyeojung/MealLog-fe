import { Route, Routes } from "react-router-dom";
import PATHS from "./paths";
import Home from "../page/home/Home";
import Sample from "../components/shared/Sample";
import Detail from "@/page/detail/Detail";
import Community from "@/page/community/Community";
import MyPage from "@/page/myPage/MyPage";
import RegisterMeal from "@/page/register-meal/RegisterMeal";
import Login from "@/page/login/Login";
import Setup from "@/page/setup/Setup";
import LogMeal from "@/page/log-meal/LogMeal";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={PATHS.LOGIN.path} element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path={PATHS.SETUP.path} element={<Setup />} />
        <Route path={PATHS.LOGMEAL.path} element={<LogMeal />} />
        <Route path={PATHS.DETAIL.path} element={<Detail />} />
        <Route path={PATHS.COMMUNITY.path} element={<Community />} />
        <Route path={PATHS.MYPAGE.path} element={<MyPage />} />
        <Route path={PATHS.REGISTERMEAL.path} element={<RegisterMeal />} />
        <Route path={PATHS.COMPONENTS.path} element={<Sample />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

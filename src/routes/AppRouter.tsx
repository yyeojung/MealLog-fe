import { Route, Routes } from "react-router-dom";
import Home from "../page/home/Home";
import PATHS from "./paths";
import Sample from "../components/shared/Sample";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={PATHS.COMPONENTS} element={<Sample />} />
    </Routes>
  );
};

export default AppRouter;

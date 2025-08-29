import type { User } from "@/types/User";

const getToken = () => {
  return sessionStorage.getItem("token");
};

const setToken = (token: string) => {
  sessionStorage.setItem("token", token);
};

const getUser = () => {
  const user = sessionStorage.getItem("user");

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

const setUser = (user: User) => {
  const oldUser = getUser();
  const mergeUser = oldUser ? { ...oldUser, ...user } : user;

  sessionStorage.setItem("user", JSON.stringify(mergeUser));
};

// 함수형으로 변경하여 호출할 때마다 최신 값을 가져옴
const isToken = () => !!getToken();
const USER_INFO = () => getUser();
const isUserInfo = () => USER_INFO() !== null;

export { getToken, setToken, getUser, setUser, isToken, isUserInfo, USER_INFO };

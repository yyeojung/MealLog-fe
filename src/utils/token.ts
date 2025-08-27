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
  sessionStorage.setItem("user", JSON.stringify(user));
};

const TOKEN = getToken();
const isToken = !!TOKEN;
const USER_INFO = getUser();
const isUserInfo = USER_INFO !== null;

export { getToken, setToken, getUser, setUser, TOKEN, isToken, isUserInfo, USER_INFO };

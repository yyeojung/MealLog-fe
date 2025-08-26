const getToken = () => {
  return sessionStorage.getItem("token");
};

const setToken = (token: string) => {
  sessionStorage.setItem("token", token);
};

const TOKEN = getToken();
const isToken = !!TOKEN;

export { getToken, setToken, TOKEN, isToken };

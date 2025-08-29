import { Button, LoadingDot } from "@/components/shared";
import { useNavigate } from "react-router-dom";
import PATHS from "@/routes/paths";
import useApi from "@/hooks/useApi";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { setToken, setUser } from "@/utils/token";

const Login = () => {
  const navigate = useNavigate();
  const { request } = useApi();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsGoogleLoading(true);
      try {
        await request({
          url: "/auth/google",
          method: "post",
          body: {
            token: response.access_token,
          },
          onSuccess: (data) => {
            setToken(data.token);
            setUser(data.user);

            if (data.user.status === "pending") {
              navigate(PATHS.SETUP.path);
            } else {
              navigate(PATHS.HOME.path);
            }
          },
          onError: (error) => {
            console.log(error.message);
          },
        });
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      alert("구글 로그인에 실패하였습니다. 다시 시도해주세요");
    },
  });

  return (
    <section className="flex h-screen w-full flex-col bg-white p-6">
      <hgroup className="flex flex-4 flex-col items-center justify-center gap-6 text-center">
        <h1 className="mb-12">
          <img src="/image/logo.svg" alt="logo" width={250} />
        </h1>
        <h2 className="text-2xl leading-9 font-bold">
          다이어트 식단을 손쉽게 기록하고
          <br />
          <span className="bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
            AI 식단 분석
          </span>{" "}
          을 받아보세요
        </h2>
        <p className="text-lg text-gray-500">⚡️ 3초 만에 빠른 회원가입</p>
      </hgroup>
      <div className="flex flex-1 flex-col gap-4">
        <Button
          className="min-h-14"
          color="black"
          onClick={() => {
            handleGoogleLogin();
          }}
        >
          {isGoogleLoading ? (
            <LoadingDot color="white" />
          ) : (
            <>
              <img src="/image/sns-google.png" alt="google" className="h-6 w-6 rounded-2xl bg-white" />
              Google로 시작하기
            </>
          )}
        </Button>
      </div>
    </section>
  );
};

export default Login;

import { Button } from "@/components/shared";

const Login = () => {
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
            식사별로 식단을 관리
          </span>
          해보세요
        </h2>
        <p className="text-lg text-gray-500">⚡️ 3초 만에 빠른 회원가입</p>
      </hgroup>

      <div className="flex flex-1 flex-col gap-4">
        <Button color="black">
          <img src="/image/sns-google.png" alt="google" className="h-6 w-6 rounded-2xl bg-white" />
          Google로 시작하기
        </Button>
      </div>
    </section>
  );
};

export default Login;

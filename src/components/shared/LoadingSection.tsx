import LoadingDot from "./LoadingDot";

const LoadingSection = () => {
  return (
    <div className="flex h-full flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
      <LoadingDot />
    </div>
  );
};

export default LoadingSection;

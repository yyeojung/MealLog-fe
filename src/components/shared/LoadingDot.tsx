interface Props {
  size?: "s" | "m";
  color?: "white" | "black" | "gray";
}

const LoadingDot = ({ size = "s", color = "gray" }: Props) => {
  return (
    <div className="flex space-x-1.5">
      <div className={`${sizeClass[size]} animate-bounce rounded-full ${colorClass[color]}`}></div>
      <div
        className={`${sizeClass[size]} animate-bounce rounded-full ${colorClass[color]}`}
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className={`${sizeClass[size]} animate-bounce rounded-full ${colorClass[color]}`}
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
  );
};

const sizeClass = {
  s: "h-1.5 w-1.5",
  m: "h-2 w-2",
};

const colorClass = {
  white: "bg-white",
  black: "bg-black",
  gray: "bg-gray-300",
};

export default LoadingDot;

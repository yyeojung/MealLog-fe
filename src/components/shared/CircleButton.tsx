export type CircleButtonColorType = "gradation" | "gray" | "white";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "s" | "m" | "l";
  color?: CircleButtonColorType;
}

const CircleButton = ({ size = "m", children, className, color = "gradation", ...props }: Props) => {
  return (
    <button className={`${commonStyles} ${sizeStyles[size]} ${colorStyles[color]} ${className || ""}`} {...props}>
      {children}
    </button>
  );
};

const commonStyles = "flex items-center justify-center rounded-full cursor-pointer";

const sizeStyles = {
  s: "h-8 w-8",
  m: "h-10 w-10",
  l: "h-12 w-12",
};

const colorStyles = {
  gradation: "bg-gradient-to-br from-blue-500 to-purple-600",
  gray: "bg-gray-100 hover:bg-gray-200 ",
  white: "bg-white hover:bg-gray-100",
};

export default CircleButton;

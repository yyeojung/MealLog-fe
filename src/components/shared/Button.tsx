import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "s" | "m";
  color?: "gradation" | "white" | "black";
}

const Button = ({ children, type = "button", className, size = "m", color = "gradation", ...props }: Props) => {
  return (
    <button
      type={type}
      className={`${commonStyles} ${sizeStyles[size]} ${colorStyles[color]} ${className || ""} `}
      {...props}
    >
      {children}
    </button>
  );
};

const commonStyles =
  "inline-flex items-center justify-center gap-2 w-full cursor-pointer whitespace-nowrap transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

const colorStyles = {
  gradation: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg",
  white: "bg-white text-black",
  black: "bg-black text-white",
};

const sizeStyles = {
  s: "rounded-lg px-4 py-2 text-sm",
  m: "rounded-xl py-4 font-medium",
};

export default Button;

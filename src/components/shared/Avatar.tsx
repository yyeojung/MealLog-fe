interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: "s" | "m" | "l";
}

const Avatar = ({ className, children, size = "m", ...props }: Props) => {
  return (
    <div className={`${commonStyles} ${sizeStyles[size]} ${className || ""}`} {...props}>
      {children}
    </div>
  );
};

const commonStyles =
  "flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden";

const sizeStyles = {
  s: "mr-3 h-10 w-10",
  m: "mr-3 h-12 w-12",
  l: "mb-4 h-20 w-20",
};

export default Avatar;

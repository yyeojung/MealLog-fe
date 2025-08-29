interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: "s" | "m";
  color?: "yellow" | "blue" | "red" | "green" | "purple" | "orange";
}

const Badge = ({ className, children, size = "m", color = "yellow", ...props }: Props) => {
  return (
    <div className={`${commonStyles} ${sizeStyles[size]} ${colorStyles[color]} ${className || ""}`} {...props}>
      {children}
    </div>
  );
};

const commonStyles = "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium";
const sizeStyles = {
  s: "px-3 py-1 text-xs",
  m: "px-4 py-2 text-sm",
};
const colorStyles = {
  yellow: "bg-yellow-100 text-yellow-700",
  blue: "bg-blue-100 text-blue-700",
  red: "bg-red-100 text-red-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
};

export default Badge;

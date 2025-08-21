interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: "s" | "m";
  color?: "yellow" | "blue";
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
};

export default Badge;

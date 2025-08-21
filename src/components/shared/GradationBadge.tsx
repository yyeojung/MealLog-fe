interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size: "s" | "m";
}

const GradationBadge = ({ className, children, size = "m", ...props }: Props) => {
  return (
    <div className={`${commonStyles} ${sizeStyles[size]} ${className || ""}`} {...props}>
      {children}
    </div>
  );
};

const commonStyles =
  "inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 px-3 py-1 text-xs font-semibold text-white shadow-sm";
const sizeStyles = {
  s: "px-3 py-1 text-xs",
  m: "px-4 py-2 text-sm",
};

export default GradationBadge;

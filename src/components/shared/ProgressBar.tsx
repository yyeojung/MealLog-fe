interface Props extends React.HTMLAttributes<HTMLDivElement> {
  progress: number;
  label?: {
    min?: string;
    middle?: string;
    max?: string;
  };
  color?: "green" | "red";
}

const ProgressBar = ({ progress, label, className, color = "green", ...props }: Props) => {
  return (
    <div className={`relative mb-4 ${className || ""}`} {...props}>
      <div className="h-4 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-4 rounded-full transition-all duration-500 ease-out ${colorStyles[color]}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {label && (
        <div className="mt-2 flex justify-between text-xs text-gray-600">
          <span className="flex-1 text-left">{label.min}</span>
          <span className="flex-1 text-center font-medium">{label.middle}</span>
          <span className="flex-1 text-right">{label.max}</span>
        </div>
      )}
    </div>
  );
};

const colorStyles = {
  green: " bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
  red: "bg-gradient-to-r from-red-400 via-orange-500 to-yellow-600",
};

export default ProgressBar;

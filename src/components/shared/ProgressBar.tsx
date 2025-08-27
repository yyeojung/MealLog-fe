interface Props extends React.HTMLAttributes<HTMLDivElement> {
  progress: number;
  label?: {
    min?: string;
    middle?: string;
    max?: string;
  };
}

const ProgressBar = ({ progress, label, className, ...props }: Props) => {
  return (
    <div className={`relative mb-4 ${className || ""}`} {...props}>
      <div className="h-4 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-4 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 transition-all duration-500 ease-out"
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

export default ProgressBar;

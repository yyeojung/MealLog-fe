import { Minus, Plus } from "lucide-react";
import CircleButton from "./CircleButton";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  onPlus: () => void;
  onMinus: () => void;
  options?: {
    min?: number;
    max?: number;
    errorMessage?: {
      min?: string;
      max?: string;
    };
  };
}

const NumberStepper = ({ className, value, onPlus, onMinus, options, ...props }: Props) => {
  const MIN = Math.min(options?.min || 0, options?.max || 0);
  const MAX = Math.max(options?.min || 0, options?.max || 0);

  const handlePlus = () => {
    if (MAX !== undefined && value >= MAX) {
      alert(options?.errorMessage?.max || "최대 값에 도달했습니다.");
      return;
    }
    onPlus();
  };

  const handleMinus = () => {
    if (MIN !== undefined && value <= MIN) {
      alert(options?.errorMessage?.min || "최소 값에 도달했습니다.");
      return;
    }
    onMinus();
  };

  return (
    <div className={`flex items-center ${className}`} {...props}>
      <CircleButton size="s" color="gray" onClick={handleMinus}>
        <Minus color="black" size={14} />
      </CircleButton>
      <span className="mx-3 text-sm font-medium">{value}</span>
      <CircleButton size="s" color="gray" onClick={handlePlus}>
        <Plus color="black" size={14} />
      </CircleButton>
    </div>
  );
};

export default NumberStepper;

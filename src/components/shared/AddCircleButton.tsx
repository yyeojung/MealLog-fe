import { Plus } from "lucide-react";
import CircleButton from "./CircleButton";

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  size?: "s" | "m" | "l";
}

const ICON_SIZE = {
  s: 18,
  m: 20,
  l: 22,
};

const AddCircleButton = ({ size = "s", ...props }: Props) => {
  return (
    <CircleButton size={size} {...props}>
      <Plus size={ICON_SIZE[size]} color="white" />
    </CircleButton>
  );
};

export default AddCircleButton;

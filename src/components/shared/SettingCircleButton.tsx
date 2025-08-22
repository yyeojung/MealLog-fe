import { Settings } from "lucide-react";
import CircleButton, { type CircleButtonColorType } from "./CircleButton";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: CircleButtonColorType;
}

const SettingCircleButton = ({ color = "gray", ...props }: Props) => {
  return (
    <CircleButton size="m" color={color} {...props}>
      <Settings size={20} color="black" />
    </CircleButton>
  );
};

export default SettingCircleButton;

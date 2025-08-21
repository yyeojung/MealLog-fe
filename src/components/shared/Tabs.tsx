import { Button } from "@components/shared";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    label: string;
    onClick: () => void;
    active: boolean;
  }[];
}

const Tabs = ({ items, className, ...props }: Props) => {
  return (
    <div
      className={`flex gap-2 rounded-xl border border-white/20 bg-white/90 p-1 shadow-sm backdrop-blur-sm ${className || ""}`}
      {...props}
    >
      {items.map((item) => (
        <Button key={item.label} size="s" onClick={item.onClick} color={item.active ? "gradation" : "white"}>
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default Tabs;

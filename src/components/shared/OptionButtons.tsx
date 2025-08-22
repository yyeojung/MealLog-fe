import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    icons?: {
      default: React.ReactNode;
      active: React.ReactNode;
    };
    label: string;
    onClick: () => void;
    active: boolean;
  }[];
}

const OptionButtons = ({ items, className, ...props }: Props) => {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className || ""}`} {...props}>
      {items.map((item) => (
        <button
          key={item.label}
          onClick={item.onClick}
          className={clsx(
            "cursor-pointer rounded-xl border-2 p-4 whitespace-nowrap transition-all duration-200",
            item.active ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300",
          )}
        >
          <div className={clsx("flex flex-col items-center gap-2", item.active ? "text-blue-500" : "text-gray-600")}>
            {item.icons && (item.active ? item.icons.active : item.icons.default)}
            {item.label}
          </div>
        </button>
      ))}
    </div>
  );
};

export default OptionButtons;

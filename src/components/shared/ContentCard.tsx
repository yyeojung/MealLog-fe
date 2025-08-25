interface Props extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode;
  contents?: React.ReactNode;
  color?: "white" | "transparent";
}

const ContentCard = ({ children, className, color = "white", heading, contents, ...props }: Props) => {
  return (
    <div
      className={`rounded-xl border p-4 ${
        color === "white"
          ? "border-white/20 bg-white/90 shadow-lg backdrop-blur-sm"
          : "border-transparent bg-transparent"
      } ${className || ""}`}
      {...props}
    >
      {heading && <div className="mb-4 flex items-center justify-between">{heading}</div>}
      {contents && contents}
      {children && children}
    </div>
  );
};

export default ContentCard;

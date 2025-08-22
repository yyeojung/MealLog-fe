const TextButton = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`inline-flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-sm whitespace-nowrap text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default TextButton;

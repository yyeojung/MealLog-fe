import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const ErrorText = ({ children, className, ...props }: Props) => {
  return (
    <p className={`text-sm text-red-500 ${className}`} {...props}>
      {children}
    </p>
  );
};

export default ErrorText;

import type { InputHTMLAttributes } from "react";
import ErrorText from "./ErrorText";
import clsx from "clsx";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: "text" | "date" | "number";
  suffix?: React.ReactNode;
  errorMessage?: string;
  paddingSize?: "s";
}

const Input = ({ className, suffix, paddingSize, errorMessage, ...props }: InputProps) => {
  return (
    <div className={`flex flex-col gap-0.5 ${className || ""}`}>
      <div className="relative">
        <input
          className={clsx(
            "w-full rounded-lg border border-gray-300 bg-white text-sm focus:border-blue-500 focus:outline-none",
            paddingSize ? paddingStyles[paddingSize] : "p-3",
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 transform text-sm text-gray-500">{suffix}</div>
        )}
      </div>
      {errorMessage && <ErrorText className="ml-3">{errorMessage}</ErrorText>}
    </div>
  );
};

export default Input;

const paddingStyles = {
  s: "p-2",
};

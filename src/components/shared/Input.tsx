import type { InputHTMLAttributes } from "react";
import ErrorText from "./ErrorText";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
  errorMessage?: string;
}

const Input = ({ className, suffix, errorMessage, ...props }: InputProps) => {
  return (
    <div className={`flex flex-col gap-0.5 ${className || ""}`}>
      <div className="relative">
        <input
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none"
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

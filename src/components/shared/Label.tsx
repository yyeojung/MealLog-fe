import type { LabelHTMLAttributes } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = ({ children, className, required, ...props }: Props) => {
  return (
    <label className={`text-lg font-semibold text-gray-800 ${className || ""}`} {...props}>
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;

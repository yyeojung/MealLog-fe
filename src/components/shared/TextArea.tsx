import type { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  value: string;
}

const TextArea = ({ className, value, maxLength, ...props }: Props) => {
  const VALUE_LENGTH = value.toString().length;

  return (
    <div className={className}>
      <textarea
        className={`h-32 w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none`}
        {...props}
        maxLength={maxLength}
        value={value}
      ></textarea>
      {maxLength && (
        <div className="text-right text-xs text-gray-500">
          {VALUE_LENGTH}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default TextArea;

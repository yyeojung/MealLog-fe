import { useState } from "react";
import { Input } from ".";
import type { InputProps } from "./Input";

export type InputNumberValueType = number | "";
interface Props extends InputProps {
  value: InputNumberValueType;
  setValue: (value: InputNumberValueType) => void;
  options?: {
    min?: number;
    max?: number;
    showErrorMessage?: boolean;
  };
}

const InputNumber = ({ value, setValue, suffix, options = {}, ...props }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const mergedOptions = {
    showErrorMessage: true,
    ...options,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");

    if (e.target.value === "") {
      setValue("");
      return;
    }

    const value = Number(e.target.value);

    console.log(mergedOptions, value);
    if (mergedOptions?.min && value < mergedOptions.min) {
      setErrorMessage(`최소값은 ${mergedOptions.min} 이상입니다.`);
    }

    if (mergedOptions?.max && value > mergedOptions.max) {
      setErrorMessage(`최대값은 ${mergedOptions.max} 이하입니다.`);
    }

    if (mergedOptions?.max && value.toString().length > mergedOptions.max.toString().length) {
      return;
    }

    if (value > Number.MAX_SAFE_INTEGER) {
      return;
    }

    if (isNaN(value)) {
      return;
    }

    setValue(value);
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      suffix={suffix}
      errorMessage={mergedOptions.showErrorMessage ? errorMessage : ""}
      {...props}
    />
  );
};

export default InputNumber;

import { useEffect, useState } from "react";
import { Input } from ".";
import type { InputProps } from "./Input";

export type InputNumberValueType = number | "";
interface Props extends InputProps {
  id: string;
  value: InputNumberValueType;
  setValue: (value: InputNumberValueType) => void;
  errors?: Record<string, string>;
  setErrors?: (errors: Record<string, string>) => void;
  options?: {
    min?: number;
    max?: number;
    showErrorMessage?: boolean;
  };
}

const InputNumber = ({ id, value, setValue, errors, setErrors, suffix, options = {}, ...props }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const mergedOptions = {
    showErrorMessage: true,
    ...options,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (mergedOptions?.max && value.toString().length > mergedOptions.max.toString().length) {
      return;
    }

    setErrorMessage("");
    setErrors?.({ ...errors, [id]: "" });

    if (e.target.value === "") {
      setValue("");
      setErrors?.({ ...errors, [id]: "" });
      return;
    }

    if (mergedOptions?.min && value < mergedOptions.min) {
      setErrorMessage(`최소값은 ${mergedOptions.min} 이상입니다.`);
      setErrors?.({ ...errors, [id]: `최소값은 ${mergedOptions.min} 이상입니다.` });
    }

    if (mergedOptions?.max && value > mergedOptions.max) {
      setErrorMessage(`최대값은 ${mergedOptions.max} 이하입니다.`);
      setErrors?.({ ...errors, [id]: `최대값은 ${mergedOptions.max} 이하입니다.` });
    }

    if (value > Number.MAX_SAFE_INTEGER) {
      return;
    }

    if (isNaN(value)) {
      return;
    }

    setValue(value);
  };

  useEffect(() => {
    setErrorMessage?.(errors?.[id] || "");
  }, [id, errors]);

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

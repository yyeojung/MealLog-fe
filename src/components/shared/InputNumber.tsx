import { useState } from "react";
import { Input } from ".";
import type { InputProps } from "./Input";

interface Props extends InputProps {
  value: number;
  setValue: (value: number) => void;
  options?: {
    min?: number;
    max?: number;
    showErrorMessage?: boolean;
  };
}

const InputNumber = ({ value, setValue, suffix, options, ...props }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setErrorMessage("");

    if (options?.min && value < options.min) {
      setErrorMessage(`최소값은 ${options.min} 이상입니다.`);
    }

    if (options?.max && value > options.max) {
      setErrorMessage(`최대값은 ${options.max} 이하입니다.`);
    }

    if (options?.max && value.toString().length > options.max.toString().length) {
      return;
    }

    if (value > Number.MAX_SAFE_INTEGER) {
      return;
    }

    if (isNaN(value)) {
      setErrorMessage("숫자를 입력해주세요.");
      return;
    }

    setValue(value);
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      suffix={suffix}
      errorMessage={options?.showErrorMessage ? errorMessage : ""}
      {...props}
    />
  );
};

export default InputNumber;

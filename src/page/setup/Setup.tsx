import { Button, InputNumber, Label, OptionButtons } from "@/components/shared";
import type { InputNumberValueType } from "@/components/shared/InputNumber";
import PATHS from "@/routes/paths";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type GenderType = "M" | "F";
type FormKey = keyof typeof FIELDS;

const FIELDS = {
  gender: {
    label: "성별",
    placeholder: "성별을 선택해주세요.",
    suffix: undefined,
    required: true,
    options: undefined,
  },
  height: {
    label: "키",
    placeholder: "키를 입력해주세요.",
    suffix: "cm",
    options: {
      min: 1,
      max: 300,
    },
    required: true,
  },
  weight: {
    label: "몸무게",
    placeholder: "몸무게를 입력해주세요.",
    suffix: "kg",
    options: {
      min: 1,
      max: 10000,
    },
    required: true,
  },
  muscleRate: {
    label: "근육량",
    placeholder: "근육량을 입력해주세요.",
    suffix: "%",
    options: {
      min: 0,
      max: 100,
    },
    required: false,
  },
  bodyFatRate: {
    label: "체지방량",
    placeholder: "체지방량을 입력해주세요.",
    suffix: "%",
    options: {
      min: 0,
      max: 100,
    },
    required: false,
  },
  goalCalorie: {
    label: "목표 칼로리",
    placeholder: "목표 칼로리를 입력해주세요.",
    suffix: "kcal",
    options: {
      min: 0,
      max: 100000,
    },
    required: true,
  },
} as const;

const Setup = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState<Record<FormKey, InputNumberValueType | GenderType>>({
    gender: "M",
    height: "",
    weight: "",
    muscleRate: "",
    bodyFatRate: "",
    goalCalorie: "",
  });

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-white px-6 py-10 pb-32">
      <h1 className="mb-12 text-2xl font-bold">
        목표 칼로리를 설정하고
        <br />
        시작해보세요!
      </h1>
      <form>
        <div className="flex flex-col gap-4">
          {Object.entries(FIELDS).map(([key, { label, placeholder, required, suffix, options }]) => (
            <div className="flex flex-col gap-1" key={key}>
              <Label required={required} htmlFor={key}>
                {label}
              </Label>
              {key === "gender" ? (
                <OptionButtons
                  items={[
                    {
                      label: "남자",
                      onClick: () => setFields({ ...fields, gender: "M" }),
                      active: fields.gender === "M",
                    },
                    {
                      label: "여자",
                      onClick: () => setFields({ ...fields, gender: "F" }),
                      active: fields.gender === "F",
                    },
                  ]}
                />
              ) : (
                <InputNumber
                  id={key}
                  placeholder={placeholder}
                  value={fields[key as FormKey] as InputNumberValueType}
                  setValue={(value) => setFields({ ...fields, [key]: value })}
                  suffix={suffix}
                  options={options}
                />
              )}
            </div>
          ))}
        </div>
        <div className="fixed right-0 bottom-0 left-0 bg-white p-6">
          <Button
            onClick={() => {
              navigate(PATHS.HOME.path);
            }}
          >
            시작하기
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Setup;

import { Button, Input, InputNumber, Label, OptionButtons } from "@/components/shared";
import type { InputNumberValueType } from "@/components/shared/InputNumber";
import useApi from "@/hooks/useApi";
import PATHS from "@/routes/paths";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingDot from "../../components/shared/LoadingDot";
import type { GENDER_TYPE } from "@/types/User";
import { getUser, isUserInfo, setUser } from "@/utils/token";

type FormKey = keyof typeof FIELDS;

const FIELDS = {
  gender: {
    label: "성별",
    placeholder: "성별을 선택해주세요.",
    suffix: undefined,
    required: true,
    options: undefined,
    defaultValue: "male",
  },
  birthDate: {
    label: "생년월일",
    placeholder: "생년월일을 입력해주세요.",
    suffix: "",
    options: undefined,
    required: true,
    defaultValue: "2002-02-02",
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
    defaultValue: "",
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
    defaultValue: "",
  },
  goalWeight: {
    label: "목표 체중",
    placeholder: "목표 체중을 입력해주세요.",
    suffix: "kg",
    options: {
      min: 1,
      max: 10000,
    },
    required: false,
    defaultValue: "",
  },
  goalCalories: {
    label: "목표 칼로리",
    placeholder: "목표 칼로리를 입력해주세요.",
    suffix: "kcal",
    options: {
      min: 0,
      max: 100000,
    },
    required: true,
    defaultValue: "",
  },
  muscleMass: {
    label: "근육량",
    placeholder: "근육량을 입력해주세요.",
    suffix: "%",
    options: {
      min: 0,
      max: 100,
    },
    required: false,
    defaultValue: "",
  },
  bodyFat: {
    label: "체지방량",
    placeholder: "체지방량을 입력해주세요.",
    suffix: "%",
    options: {
      min: 0,
      max: 100,
    },
    required: false,
    defaultValue: "",
  },
} as const;

const Setup = () => {
  const navigate = useNavigate();
  const { request, loading } = useApi();
  const user = getUser();

  const [fields, setFields] = useState(
    Object.entries(FIELDS).reduce(
      (acc, [key, value]) => {
        let userValue;
        if (isUserInfo() && key === "birthDate") {
          const birthDateValue = user?.[key as FormKey];
          if (birthDateValue && !isNaN(new Date(birthDateValue).getTime())) {
            userValue = new Date(birthDateValue).toISOString().split("T")[0];
          } else {
            userValue = value.defaultValue;
          }
        } else {
          userValue = user?.[key as FormKey];
        }
        acc[key as FormKey] = userValue || value.defaultValue;
        return acc;
      },
      {} as Record<FormKey, InputNumberValueType | GENDER_TYPE | string>,
    ),
  );
  const [errors, setErrors] = useState(
    Object.entries(FIELDS).reduce(
      (acc, [key]) => {
        acc[key as FormKey] = "";
        return acc;
      },
      {} as Record<FormKey, string>,
    ),
  );

  const handleValidate = () => {
    // 필수값 검사
    const requiredErrors = Object.entries(FIELDS).reduce(
      (acc, [key, { required }]) => {
        if (required && !fields[key as FormKey]) {
          acc[key as FormKey] = "필수 항목을 입력해주세요";
        }
        return acc;
      },
      {} as Record<FormKey, string>,
    );

    // 에러 상태 업데이트
    const newErrors = { ...errors, ...requiredErrors };
    setErrors(newErrors);

    // 에러 경고 메세지
    if (Object.values(newErrors).some((value) => value)) {
      alert("입력 항목을 다시 확인해주세요");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!handleValidate()) return;

    request({
      url: "/user",
      method: "put",
      body: {
        ...fields,
      },
      onSuccess: (data) => {
        setUser(data.user);
        navigate(PATHS.HOME.path);
      },
    });
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-white px-6 py-10">
      <h1 className="mb-12 text-2xl font-bold whitespace-pre-line">
        {user?.status === "pending" ? "목표 칼로리를 설정하고\n시작해보세요!" : "회원정보를\n수정해주세요"}
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
                      onClick: () => setFields({ ...fields, gender: "male" }),
                      active: fields.gender === "male",
                    },
                    {
                      label: "여자",
                      onClick: () => setFields({ ...fields, gender: "female" }),
                      active: fields.gender === "female",
                    },
                  ]}
                />
              ) : key === "birthDate" ? (
                <Input
                  type="date"
                  value={fields[key as FormKey] as string}
                  onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
                />
              ) : (
                <InputNumber
                  id={key}
                  placeholder={placeholder}
                  value={fields[key as FormKey] as InputNumberValueType}
                  setValue={(value) => setFields({ ...fields, [key]: value })}
                  errors={errors}
                  setErrors={setErrors}
                  suffix={suffix}
                  options={options}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 bg-white">
          <Button onClick={() => handleSubmit()} disabled={loading}>
            {loading ? <LoadingDot /> : user?.status === "pending" ? "시작하기" : "수정하기"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Setup;

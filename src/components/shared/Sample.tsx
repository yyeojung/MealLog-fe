import {
  AddCircleButton,
  Avatar,
  Badge,
  Button,
  ContentCard,
  GradationBadge,
  InputNumber,
  Label,
  NumberStepper,
  OptionButtons,
  ProgressBar,
  SettingCircleButton,
  Tabs,
  TextArea,
  TextButton,
} from "@components/shared";
import { Cake, Moon, Plus, Search, Sun, User } from "lucide-react";
import { useState } from "react";
import Input from "./Input";
import type { InputNumberValueType } from "./InputNumber";

const Sample = () => {
  const [num, setNum] = useState<number>(1);
  const [numValue, setNumValue] = useState<InputNumberValueType>(1);
  const [textValue, setTextValue] = useState<string>("");

  return (
    <div className="flex flex-col gap-4">
      <Button size="s">
        <Plus color="white" size={16} /> CLICK!
      </Button>
      <Button size="m">CLICK!</Button>

      <div className="flex gap-4">
        <AddCircleButton size="s" />
        <AddCircleButton size="m" />
        <AddCircleButton size="l" />
        <SettingCircleButton />
        <SettingCircleButton color="white" />
        <TextButton>
          <Plus color="blue" size={16} /> 검색으로 찾기
        </TextButton>
      </div>

      <NumberStepper
        key={num}
        value={num}
        onPlus={() => setNum((prev) => prev + 1)}
        onMinus={() => setNum((prev) => prev - 1)}
        options={{
          min: 4,
          max: 1,
          errorMessage: {
            min: "최소 값에 도달했습니다.",
            max: "최대 값에 도달했습니다.",
          },
        }}
      />

      <ProgressBar progress={83} label={{ middle: "83%", max: "1,500" }} />
      <Tabs
        items={[
          { label: "탭 1", onClick: () => {}, active: true },
          { label: "탭 2", onClick: () => {}, active: false },
          { label: "탭 3", onClick: () => {}, active: false },
          { label: "탭 4", onClick: () => {}, active: false },
        ]}
      />
      <div>
        <GradationBadge size="s">레벨 7 다이어트 실력자</GradationBadge>
        <GradationBadge size="m">레벨 7 다이어트 실력자</GradationBadge>
      </div>
      <div>
        <Badge size="s" color="yellow">
          거의 다 왔어요!
        </Badge>
        <Badge size="m" color="blue">
          거의 다 왔어요!
        </Badge>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Avatar size="s">
          <User size={24} color="white" />
        </Avatar>
        <Avatar size="m">
          <User size={24} color="white" />
        </Avatar>
        <Avatar size="l">
          <User size={24} color="white" />
        </Avatar>
      </div>
      <Input placeholder="이름을 입력해주세요." suffix={<Search size={16} color="gray" />} />

      <ContentCard
        color="transparent"
        heading={
          <>
            <Label required htmlFor="content">
              칼로리
            </Label>
            <TextButton>
              <Plus color="blue" size={16} /> 검색으로 찾기
            </TextButton>
          </>
        }
        contents={
          <InputNumber
            id="content"
            value={numValue}
            setValue={setNumValue}
            suffix={"kcal"}
            options={{ min: 1, max: 1000, showErrorMessage: true }}
          />
        }
      />

      <ContentCard color="transparent">
        <Label required htmlFor="content">
          내용
        </Label>
        <TextArea
          id="content"
          placeholder="내용을 입력해주세요."
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          maxLength={100}
        />
      </ContentCard>

      <ContentCard
        heading={
          <Label required htmlFor="content">
            식사분류
          </Label>
        }
      >
        <OptionButtons
          items={[
            {
              label: "아침",
              onClick: () => {},
              active: true,
              icons: {
                default: <Sun size={24} color="gray" />,
                active: <Sun size={24} className="text-blue-500" />,
              },
            },
            {
              label: "점심",
              onClick: () => {},
              active: false,
              icons: {
                default: <Sun size={24} color="gray" />,
                active: <Sun size={24} className="text-blue-500" />,
              },
            },
            {
              label: "저녁",
              onClick: () => {},
              active: false,
              icons: {
                default: <Moon size={24} color="gray" />,
                active: <Moon size={24} className="text-blue-500" />,
              },
            },
            {
              label: "간식",
              onClick: () => {},
              active: false,
              icons: {
                default: <Cake size={24} color="gray" />,
                active: <Cake size={24} className="text-blue-500" />,
              },
            },
          ]}
        />
      </ContentCard>
    </div>
  );
};

export default Sample;

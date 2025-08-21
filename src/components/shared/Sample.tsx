import { Avatar, Badge, Button, GradationBadge, ProgressBar, Tabs } from "@components/shared";
import { User } from "lucide-react";

const Sample = () => {
  return (
    <div className="flex flex-col gap-4">
      <Button size="s">CLICK!</Button>
      <Button size="m">CLICK!</Button>
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
    </div>
  );
};

export default Sample;

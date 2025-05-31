import { NotificationTabEnums } from "@/enums";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const topTabs: NotificationTabEnums[] = Object.values(NotificationTabEnums);

type TopTabProps = {
  activeTab: NotificationTabEnums;
  changeTab: (tab: NotificationTabEnums) => void;
};

export const NotificationTopTab = ({ activeTab, changeTab }: TopTabProps) => {
  const [sliderLeft, setSliderLeft] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const currentIndex = topTabs.indexOf(activeTab);
    if (buttonRefs.current[currentIndex]) {
      const { left } =
        buttonRefs.current[currentIndex]!.getBoundingClientRect();
      const parentLeft =
        buttonRefs.current[0]!.parentElement!.getBoundingClientRect().left;
      setSliderLeft(left - parentLeft);
    }
  }, [activeTab]);

  return (
    <TopTabContainer
      className="bg-gray-900 px-1 py-1 rounded-full relative"
      tabLength={topTabs.length}
    >
      <Slider style={{ left: `${sliderLeft}px` }} className="self-center" />
      {topTabs.map((item, index) => (
        <button
          key={item}
          ref={(el) => (buttonRefs.current[index] = el) as any}
          className={cn(
            "font-sfpro w-full !text-sm z-2 relative cursor-pointer",
            {
              "text-gray-200": activeTab !== item,
              "text-gray-900": activeTab === item,
            }
          )}
          onClick={() => changeTab(item)}
        >
          {item}
        </button>
      ))}
    </TopTabContainer>
  );
};

const TopTabContainer = styled.div<{ tabLength: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.tabLength}, 1fr)`};
  gap: 4px;
  position: relative;
  overflow: hidden;
`;

const Slider = styled.div`
  position: absolute;
  width: 116px;
  height: 20px;
  background-color: white;
  border-radius: 9999px;
  transition: left 0.1s linear;
  z-index: 0;
`;

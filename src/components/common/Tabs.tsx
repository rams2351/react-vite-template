import { cn } from "@/utils/helpers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { type ReactNode, useEffect, useRef, useState } from "react";

interface TabItem {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChangeTab: (value: string) => void;
  containerClassName?: string;
  tabItemClassName?: string;
  activeTabClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChangeTab, tabItemClassName, activeTabClassName, containerClassName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const updateArrows = () => {
    const el = containerRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 5); // with buffer
  };

  useEffect(() => {
    updateArrows();
    const handleResize = () => updateArrows();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    updateArrows();
  });

  const scrollTabs = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: direction === "left" ? -150 : 150,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showLeftArrow && (
        <div
          className="absolute cursor-pointer left-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-r from-background via-background pr-2"
          onClick={() => scrollTabs("left")}
        >
          <button className="p-1 rounded-full hover:bg-muted cursor-pointer">
            <ChevronLeft className="size-5" />
          </button>
        </div>
      )}

      {/* Tab List */}
      <div
        ref={containerRef}
        className={cn(
          "flex border-b max-w-full overflow-x-auto no-scrollbar scroll-smooth  no-scrollbar ",
          showLeftArrow ? "pl-6" : "pl-0",
          showRightArrow ? "pr-6" : "pr-0",
          containerClassName
        )}
        onScroll={updateArrows}
      >
        {tabs.map((item) => (
          <div
            key={item.value}
            className={cn(
              "px-4 py-3 pb-2 text-sm border-b-2 transition-colors rounded-none rounded-t-md font-[500] text-[15px] cursor-pointer whitespace-nowrap",
              activeTab === item.value
                ? cn("border-primary text-primary", activeTabClassName)
                : "border-transparent text-foreground hover:bg-input-background",
              tabItemClassName
            )}
            onClick={() => onChangeTab(item.value)}
          >
            <div className="flex flex-row gap-2 items-center">
              {item.icon}
              <p>{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <div
          className="absolute right-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-l from-background via-background pl-2"
          onClick={() => scrollTabs("right")}
        >
          <button className="p-1 rounded-full hover:bg-muted cursor-pointer">
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Tabs;

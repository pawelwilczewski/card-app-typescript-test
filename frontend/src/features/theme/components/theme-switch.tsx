import ThreeWaySwitch, { ThreeWaySwitchState } from "@/features/shared/components/three-way-switch";
import { ThemeContext } from "@/features/theme/context/theme-context";
import { Theme } from "@/features/theme/types/theme";
import React, { useContext } from "react";

const ThemeSwitch: React.FC = ({}) => {
  const { theme, setTheme } = useContext(ThemeContext)!;

  const themeToSwitchState: Record<Theme, ThreeWaySwitchState> = {
    auto: "middle",
    light: "left",
    dark: "right",
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Theme</span>
      <ThreeWaySwitch
        initialState={themeToSwitchState[theme]}
        onLeft={() => setTheme("light")}
        onMiddle={() => setTheme("auto")}
        onRight={() => setTheme("dark")}
      >
        <span>Light</span>
        <span>Auto</span>
        <span>Dark</span>
      </ThreeWaySwitch>
    </div>
  );
};

export default ThemeSwitch;

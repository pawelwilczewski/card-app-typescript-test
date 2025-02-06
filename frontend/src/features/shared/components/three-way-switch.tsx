import React, { useState } from "react";

export type ThreeWaySwitchState = "left" | "middle" | "right";

type ThreeWaySwitchProps = {
  initialState: ThreeWaySwitchState;
  onLeft?: () => void;
  onMiddle?: () => void;
  onRight?: () => void;
  onChange?: (state: ThreeWaySwitchState) => void;
  children?: React.ReactNode;
};

const ThreeWaySwitch: React.FC<ThreeWaySwitchProps> = ({
  initialState,
  onLeft,
  onMiddle,
  onRight,
  onChange,
  children,
}) => {
  const [state, setState] = useState<ThreeWaySwitchState>(initialState);

  const childrenArray = React.Children.toArray(children);

  const handleClick = (newState: ThreeWaySwitchState): void => {
    setState(newState);

    if (onChange) {
      onChange(newState);
    }

    switch (newState) {
      case "left": {
        onLeft?.();
        break;
      }
      case "middle": {
        onMiddle?.();
        break;
      }
      case "right": {
        onRight?.();
        break;
      }
    }
  };

  return (
    <div className="flex items-center bg-muted rounded-xl border shadow-inner p-1">
      <button
        onClick={() => handleClick("left")}
        className={`flex-1 h-full text-sm font-medium transition-all duration-200 ease-out rounded-lg border p-1 ${
          state === "left"
            ? "bg-foreground text-background shadow-sm"
            : "text-foreground hover:text-muted-foreground border-transparent"
        }`}
      >
        {childrenArray.length > 0 ? childrenArray[0] : "Left"}
      </button>
      <button
        onClick={() => handleClick("middle")}
        className={`flex-1 h-full text-sm font-medium transition-all duration-200 ease-out mx-1 rounded-lg border p-1 ${
          state === "middle"
            ? "bg-foreground text-background shadow-sm"
            : "text-foreground hover:text-muted-foreground border-transparent"
        }`}
      >
        {childrenArray.length > 1 ? childrenArray[1] : "Middle"}
      </button>
      <button
        onClick={() => handleClick("right")}
        className={`flex-1 h-full text-sm font-medium transition-all duration-200 ease-out rounded-lg border p-1 ${
          state === "right"
            ? "bg-foreground text-background shadow-sm"
            : "text-foreground hover:text-muted-foreground border-transparent"
        }`}
      >
        {childrenArray.length > 2 ? childrenArray[2] : "Right"}
      </button>
    </div>
  );
};

export default ThreeWaySwitch;

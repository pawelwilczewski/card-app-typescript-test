import PrimitiveButton from "@/features/shared/components/primitive-button";
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
      <PrimitiveButton
        className={"transition-colors duration-200 ease-out"}
        variant={state == "left" ? "inverse" : "ghost"}
        size="small"
        onClick={() => handleClick("left")}
      >
        {childrenArray.length > 0 ? childrenArray[0] : "Left"}
      </PrimitiveButton>
      <PrimitiveButton
        className={"transition-colors duration-200 ease-out"}
        variant={state == "middle" ? "inverse" : "ghost"}
        size="small"
        onClick={() => handleClick("middle")}
      >
        {childrenArray.length > 1 ? childrenArray[1] : "Middle"}
      </PrimitiveButton>
      <PrimitiveButton
        className={"transition-colors duration-200 ease-out"}
        variant={state == "right" ? "inverse" : "ghost"}
        size="small"
        onClick={() => handleClick("right")}
      >
        {childrenArray.length > 2 ? childrenArray[2] : "Right"}
      </PrimitiveButton>
    </div>
  );
};

export default ThreeWaySwitch;

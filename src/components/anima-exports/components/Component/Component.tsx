'use client';

import React, { useReducer } from "react";
import { clsx } from 'clsx';

interface ComponentProps {
  variant?: "one" | "two" | "three" | "four" | "five";
  hover?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

interface ComponentState {
  variant: "one" | "two" | "three" | "four" | "five";
  hover: boolean;
}

type ComponentAction = "mouse_enter" | "mouse_leave";

function reducer(state: ComponentState, action: ComponentAction): ComponentState {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        hover: true,
      };
    case "mouse_leave":
      return {
        ...state,
        hover: false,
      };
    default:
      return state;
  }
}

export const Component: React.FC<ComponentProps> = ({
  variant = "one",
  hover = false,
  icon,
  className,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    variant,
    hover,
  });

  const componentClasses = clsx(
    'component cursor-pointer transition-all duration-200',
    `variant-${state.variant}`,
    {
      'hover:shadow-lg': true,
      'transform hover:scale-105': state.variant === 'one',
    },
    className
  );

  return (
    <div
      className={componentClasses}
      onMouseEnter={() => dispatch("mouse_enter")}
      onMouseLeave={() => dispatch("mouse_leave")}
    >
      {icon && (
        <div className="component-icon">
          {icon}
        </div>
      )}
    </div>
  );
};
/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Component1_55 } from "../../icons/Component1_55";
import { Component1_56 } from "../../icons/Component1_56";
import "./style.css";

export const Component5 = ({
  text = "Running",
  variant,
  hover,
  className,
  component156StyleOverrideClassName,
  textClassName,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    variant: variant || "one",

    hover: hover || false,
  });

  return (
    <div
      className={`component-5 ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      <div className={`text-2 ${textClassName}`}>{text}</div>

      {state.hover && <Component1_55 className="component-1-55" />}

      {!state.hover && (
        <Component1_56 className={component156StyleOverrideClassName} />
      )}
    </div>
  );
};

function reducer(state, action) {
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
  }

  return state;
}

Component5.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["one"]),
  hover: PropTypes.bool,
};

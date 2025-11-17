/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Component1_14 } from "../../icons/Component1_14";
import "./style.css";

export const Component10 = ({
  variant,
  hover,
  className,
  icon = <Component1_14 className="component-1-14" />,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    variant: variant || "one",

    hover: hover || false,
  });

  return (
    <div
      className={`component-10 ${state.variant} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      {icon}
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

Component10.propTypes = {
  variant: PropTypes.oneOf([
    "seven",
    "two",
    "three",
    "nine",
    "four",
    "one",
    "five",
    "eight",
    "six",
  ]),
  hover: PropTypes.bool,
};

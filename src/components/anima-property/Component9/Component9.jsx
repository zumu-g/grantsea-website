/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { VariantWrapper } from "../VariantWrapper";
import "./style.css";

export const Component9 = ({
  text = "Select a size",
  variant,
  hover,
  className,
  override = (
    <VariantWrapper className="component-instance" variant="sixteen" />
  ),
}) => {
  const [state, dispatch] = useReducer(reducer, {
    variant: variant || "one",

    hover: hover || false,
  });

  return (
    <div
      className={`component-9 hover-${state.hover} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div className="div">
        <div className="text-2">{text}</div>
      </div>

      <div className="SVG-margin">
        <div className="SVG">{override}</div>
      </div>
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

Component9.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["one"]),
  hover: PropTypes.bool,
};

/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Component1_77 } from "../../icons/Component1_77";
import { Variant5 } from "../../icons/Variant5";
import "./style.css";

export const Component7 = ({ variant, hover, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    variant: variant || "one",

    hover: hover || false,
  });

  return (
    <div
      className={`component-7 hover-3-${state.hover} variant-13-${state.variant} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      {state.variant === "one" && <Component1_77 className="instance-node" />}

      {state.variant === "two" && (
        <Variant5 className="instance-node" color="black" />
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

Component7.propTypes = {
  variant: PropTypes.oneOf(["two", "one"]),
  hover: PropTypes.bool,
};

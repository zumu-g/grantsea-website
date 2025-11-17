/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Component9_75 } from "../../icons/Component9_75";
import { Variant6 } from "../../icons/Variant6";
import { Variant7 } from "../../icons/Variant7";
import { Variant12 } from "../../icons/Variant12";
import { Variant13 } from "../../icons/Variant13";
import { Variant14 } from "../../icons/Variant14";
import "./style.css";

export const Component3 = ({ variant, hover, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    variant: variant || "one",

    hover: hover || false,
  });

  return (
    <div
      className={`component-3 hover-1-${state.hover} variant-0-${state.variant} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      {state.variant === "one" && <Variant6 className="component-6" />}

      {state.variant === "two" && <Variant7 className="component-6" />}

      {state.variant === "three" && <Component9_75 className="component-7" />}

      {["four", "seven"].includes(state.variant) && (
        <Variant12 className="component-7" />
      )}

      {["eight", "five"].includes(state.variant) && (
        <Variant13 className="component-7" />
      )}

      {["nine", "six"].includes(state.variant) && (
        <Variant14 className="component-7" />
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

Component3.propTypes = {
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

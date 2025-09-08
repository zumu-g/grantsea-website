/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Component9_5 } from "../../icons/Component9_5";
import { Component9_7 } from "../../icons/Component9_7";
import { Variant19 } from "../../icons/Variant19";
import { Variant20 } from "../../icons/Variant20";
import { Variant23 } from "../../icons/Variant23";
import { Variant29 } from "../../icons/Variant29";
import { Variant30 } from "../../icons/Variant30";
import { Variant32 } from "../../icons/Variant32";
import { Variant34 } from "../../icons/Variant34";
import "./style.css";

export const Component10 = ({ variant, hover, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    variant: variant || "one",

    hover: hover || false,
  });

  return (
    <div
      className={`component-10 ${state.variant} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      {state.variant === "one" && (
        <Variant23
          className="component-5"
          color={state.hover ? "#4D4D4D" : "black"}
        />
      )}

      {state.variant === "two" && (
        <Component9_5
          className="component-5"
          color={state.hover ? "#4D4D4D" : "black"}
        />
      )}

      {state.variant === "three" && (
        <Component9_7
          className="component-5"
          color={state.hover ? "#4D4D4D" : "black"}
        />
      )}

      {state.variant === "four" && (
        <Variant29
          className="component-5"
          color={state.hover ? "#4D4D4D" : "black"}
        />
      )}

      {state.variant === "five" && (
        <Variant30
          className="component-5"
          color={state.hover ? "#4D4D4D" : "black"}
        />
      )}

      {state.variant === "six" && (
        <Variant32
          className="component-5"
          color={state.hover ? "#4D4D4D" : "black"}
        />
      )}

      {state.variant === "seven" && (
        <Variant34
          className="component-5"
          color={state.hover ? "#4D4D4D" : "black"}
        />
      )}

      {state.variant === "eight" && <Variant19 className="component-5" />}

      {state.variant === "nine" && <Variant20 className="component-5" />}
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

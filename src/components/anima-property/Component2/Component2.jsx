/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Component9_73 } from "../../icons/Component9_73";
import { Component9_79 } from "../../icons/Component9_79";
import { Variant2 } from "../../icons/Variant2";
import { Variant3 } from "../../icons/Variant3";
import { Variant4 } from "../../icons/Variant4";
import { Variant9 } from "../../icons/Variant9";
import "./style.css";

export const Component2 = ({ variant, hover, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    variant: variant || "one",

    hover: hover || false,
  });

  return (
    <div
      className={`component-2 hover-0-${state.hover} ${state.variant} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      {state.variant === "one" && <Variant2 className="instance-node" />}

      {state.variant === "two" && <Variant3 className="instance-node" />}

      {state.variant === "three" && <Variant4 className="instance-node" />}

      {state.variant === "four" && <Variant9 className="component-4" />}

      {state.variant === "five" && <Component9_73 className="component-4" />}

      {state.variant === "six" && <Component9_79 className="component-9-79" />}
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

Component2.propTypes = {
  variant: PropTypes.oneOf(["two", "three", "four", "one", "five", "six"]),
  hover: PropTypes.bool,
};

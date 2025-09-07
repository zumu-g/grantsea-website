/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { Component1_86 } from "../../icons/Component1_86";
import { Variant5 } from "../../icons/Variant5";
import "./style.css";

export const Component6 = ({
  text = "Cloud",
  variant,
  hover,
  component186StyleOverrideClassName,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    variant: variant || "one",

    hover: hover || false,
  });

  return (
    <div
      className="component-6"
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      <div className="picture-cloud-wrapper">
        <div className={`picture-cloud variant-8-${state.variant}`} />
      </div>

      <div className={`container-2 variant-9-${state.variant}`}>
        <div className="cloud-wrapper">
          <div className="cloud">
            <div className="margin-2">
              <div
                className={`container-42 hover-1-${state.hover} variant-11-${state.variant}`}
              >
                {((!state.hover && state.variant === "five") ||
                  (!state.hover && state.variant === "four") ||
                  (!state.hover && state.variant === "one") ||
                  (!state.hover && state.variant === "three") ||
                  (!state.hover && state.variant === "two") ||
                  state.hover) && (
                  <div className="text-7">
                    {(!state.hover || state.variant === "six") && <>{text}</>}

                    {((state.hover && state.variant === "five") ||
                      (state.hover && state.variant === "four") ||
                      (state.hover && state.variant === "one") ||
                      (state.hover && state.variant === "three") ||
                      (state.hover && state.variant === "two")) && (
                      <div className="text-3">{text}</div>
                    )}
                  </div>
                )}

                {state.variant === "six" && !state.hover && <>{text}</>}
              </div>
            </div>

            {state.hover && (
              <Variant5 className="component-1-29" color="white" />
            )}

            {!state.hover && (
              <Component1_86 className={component186StyleOverrideClassName} />
            )}
          </div>
        </div>
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

Component6.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["two", "three", "four", "one", "five", "six"]),
  hover: PropTypes.bool,
};

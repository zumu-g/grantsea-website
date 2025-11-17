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

export const Component4 = ({
  text = "Shoes",
  variant,
  hover,
  className,
  component186StyleOverrideClassName,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    variant: variant || "one",

    hover: hover || false,
  });

  return (
    <div
      className={`component-4 variant-${state.variant} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      <div className="picture-wrapper">
        <div className="picture" />
      </div>

      <div className="gradient" />

      <div className="container-wrapper">
        <div className="shoes-wrapper">
          <div className="shoes">
            <div className="margin">
              <div className="text-wrapper">
                <div
                  className={`text-7 hover-0-${state.hover} variant-7-${state.variant}`}
                >
                  {!state.hover && <>{text}</>}

                  {state.hover && <div className="div">{text}</div>}
                </div>
              </div>
            </div>

            {state.hover && <Variant5 className="variant-5" color="white" />}

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

Component4.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf([
    "seven",
    "two",
    "three",
    "four",
    "one",
    "five",
    "six",
  ]),
  hover: PropTypes.bool,
};

/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Component1_88 } from "../../icons/Component1_88";
import "./style.css";

export const Component8 = ({ text = "Read more", variant, className }) => {
  return (
    <div className={`component-8 ${className}`}>
      <div className="div-wrapper">
        <div className="text-4">{text}</div>
      </div>

      <div className="SVG-margin">
        <div className="SVG">
          <Component1_88 className="component-1-88" />
        </div>
      </div>
    </div>
  );
};

Component8.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["one"]),
};

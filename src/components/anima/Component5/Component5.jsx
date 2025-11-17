/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Variant16 } from "../../icons/Variant16";
import "./style.css";

export const Component5 = ({ text = "Select a size", variant, className }) => {
  return (
    <div className={`component-5 ${className}`}>
      <div className="container">
        <div className="text-wrapper">{text}</div>
      </div>

      <div className="SVG-margin">
        <div className="SVG">
          <Variant16 className="variant-16" />
        </div>
      </div>
    </div>
  );
};

Component5.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["one"]),
};

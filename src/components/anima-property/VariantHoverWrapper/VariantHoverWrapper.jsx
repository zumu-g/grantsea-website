/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const VariantHoverWrapper = ({ text = "Men", variant, className }) => {
  return (
    <div className={`variant-hover-wrapper ${className}`}>
      <div className="text-wrapper">{text}</div>
    </div>
  );
};

VariantHoverWrapper.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["one"]),
};

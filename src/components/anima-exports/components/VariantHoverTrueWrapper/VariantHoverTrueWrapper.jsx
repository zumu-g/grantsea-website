/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const VariantHoverTrueWrapper = ({
  text = "Shop men's",
  variant,
  className,
  containerClassName,
}) => {
  return (
    <div className={`variant-hover-true-wrapper ${className}`}>
      <div className={`container ${containerClassName}`}>
        <div className="text">{text}</div>
      </div>
    </div>
  );
};

VariantHoverTrueWrapper.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["one"]),
};

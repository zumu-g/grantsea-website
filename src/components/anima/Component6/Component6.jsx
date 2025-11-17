/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Component6 = ({ text = "Add to bag", variant, className }) => {
  return (
    <div className={`component-6 ${className}`}>
      <div className="div">
        <div className="text-2">{text}</div>
      </div>
    </div>
  );
};

Component6.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["one"]),
};

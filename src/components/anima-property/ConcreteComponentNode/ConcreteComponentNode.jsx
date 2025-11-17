/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const ConcreteComponentNode = ({ variant, className }) => {
  return (
    <div className={`concrete-component-node ${className}`}>
      <div className="container-2" />
    </div>
  );
};

ConcreteComponentNode.propTypes = {
  variant: PropTypes.oneOf(["one"]),
};

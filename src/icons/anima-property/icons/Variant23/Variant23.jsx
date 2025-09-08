/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Variant23 = ({ color = "black", className }) => {
  return (
    <svg
      className={`variant-23 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 25 25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M17.4051 6.88075H14.6021C14.2821 6.88075 13.8821 7.28575 13.8821 7.93475V9.96175H17.4041L16.8441 12.8807H13.8811V21.7188H10.5981V12.8807H7.55511V9.96175H10.5981V8.25875C10.5981 5.74575 12.2791 3.71875 14.6021 3.71875H17.4041L17.4051 6.88075Z"
        fill={color}
      />
    </svg>
  );
};

Variant23.propTypes = {
  color: PropTypes.string,
};

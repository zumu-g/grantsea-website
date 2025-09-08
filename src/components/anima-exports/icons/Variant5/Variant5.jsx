/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Variant5 = ({ color = "white", className }) => {
  return (
    <svg
      className={`variant-5 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 24 25"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M19.293 11.6919L15.146 7.54589L15.854 6.83789L21.207 12.1919L15.854 17.5459L15.146 16.8389L19.293 12.6919H3V11.6919H19.293Z"
        fill={color}
        stroke={color}
      />
    </svg>
  );
};

Variant5.propTypes = {
  color: PropTypes.string,
};

/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Variant32 = ({ color = "#4D4D4D", className }) => {
  return (
    <svg
      className={`variant-32 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 25 25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M14.0371 11.3407L20.5951 3.71875H19.0411L13.3481 10.3368L8.80011 3.71875H3.55511L10.4311 13.7257L3.55511 21.7188H5.10911L11.1211 14.7297L15.9231 21.7188H21.1681L14.0371 11.3407ZM5.66911 4.88875H8.05511L19.0411 20.6028H16.6541L5.66911 4.88875Z"
        fill={color}
      />
    </svg>
  );
};

Variant32.propTypes = {
  color: PropTypes.string,
};

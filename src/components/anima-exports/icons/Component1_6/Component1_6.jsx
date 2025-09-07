/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Component1_6 = ({ color = "#4D4D4D", className }) => {
  return (
    <svg
      className={`component-1-6 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 25 25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M14.613 22.1299L10.426 13.9109H12.913L14.613 17.2329L16.28 13.9099H18.767L14.612 22.1289L14.613 22.1299ZM10.673 9.44588L12.944 13.9259H16.266L10.642 2.87988L5.08002 13.9259H8.41702L10.673 9.44588Z"
        fill={color}
      />
    </svg>
  );
};

Component1_6.propTypes = {
  color: PropTypes.string,
};

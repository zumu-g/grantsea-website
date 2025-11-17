/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Component1_96 = ({ color = "black", className }) => {
  return (
    <svg
      className={`component-1-96 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 24 25"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M13.482 10.8134L20.04 3.19141H18.486L12.793 9.80941L8.245 3.19141H3L9.876 13.1984L3 21.1914H4.554L10.566 14.2024L15.368 21.1914H20.613L13.482 10.8134ZM5.114 4.36141H7.5L18.486 20.0754H16.099L5.114 4.36141Z"
        fill={color}
      />
    </svg>
  );
};

Component1_96.propTypes = {
  color: PropTypes.string,
};

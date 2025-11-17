/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Component1_64 = ({ color = "black", className }) => {
  return (
    <svg
      className={`component-1-64 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 25 25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M15.0881 21.9688L10.9011 13.7498H13.3881L15.0881 17.0718L16.7551 13.7487H19.2421L15.0871 21.9678L15.0881 21.9688ZM11.1481 9.28475L13.4191 13.7647H16.7411L11.1171 2.71875L5.55511 13.7647H8.89211L11.1481 9.28475Z"
        fill={color}
      />
    </svg>
  );
};

Component1_64.propTypes = {
  color: PropTypes.string,
};

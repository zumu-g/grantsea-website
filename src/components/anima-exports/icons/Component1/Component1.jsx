/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Component1 = ({ color = "#4D4D4D", className }) => {
  return (
    <svg
      className={`component-1 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 24 25"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M16.85 7.04188H14.047C13.727 7.04188 13.327 7.44688 13.327 8.09588V10.1229H16.849L16.289 13.0419H13.326V21.8799H10.043V13.0419H7V10.1229H10.043V8.41988C10.043 5.90688 11.724 3.87988 14.047 3.87988H16.849L16.85 7.04188Z"
        fill={color}
      />
    </svg>
  );
};

Component1.propTypes = {
  color: PropTypes.string,
};

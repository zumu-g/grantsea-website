/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Component1_13 = ({ color = "black", className }) => {
  return (
    <svg
      className={`component-1-13 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 24 25"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M12.03 5.87988C3.158 5.87988 3 6.65988 3 12.7419C3 18.8239 3.159 19.6029 12.03 19.6029C20.901 19.6029 21.06 18.8229 21.06 12.7419C21.06 6.65988 20.901 5.87988 12.03 5.87988ZM14.961 13.0539L10.921 14.9249C10.605 15.0809 10.287 14.9249 10.287 14.5349V10.9479C10.208 10.5579 10.525 10.4019 10.842 10.5579L14.882 12.4299C15.278 12.5859 15.278 12.8199 14.962 13.0529L14.961 13.0539Z"
        fill={color}
      />
    </svg>
  );
};

Component1_13.propTypes = {
  color: PropTypes.string,
};

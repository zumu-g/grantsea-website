/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Component1_67 = ({ color = "black", className }) => {
  return (
    <svg
      className={`component-1-67 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 25 25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M12.5851 5.71875C3.71311 5.71875 3.55511 6.49875 3.55511 12.5808C3.55511 18.6628 3.71411 19.4417 12.5851 19.4417C21.4561 19.4417 21.6151 18.6618 21.6151 12.5808C21.6151 6.49875 21.4561 5.71875 12.5851 5.71875ZM15.5161 12.8927L11.4761 14.7638C11.1601 14.9198 10.8421 14.7637 10.8421 14.3737V10.7867C10.7631 10.3967 11.0801 10.2408 11.3971 10.3968L15.4371 12.2688C15.8331 12.4248 15.8331 12.6588 15.5171 12.8918L15.5161 12.8927Z"
        fill={color}
      />
    </svg>
  );
};

Component1_67.propTypes = {
  color: PropTypes.string,
};

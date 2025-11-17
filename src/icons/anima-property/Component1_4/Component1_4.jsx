/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Component1_4 = ({ color = "#4D4D4D", className }) => {
  return (
    <svg
      className={`component-1-4 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 25 25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M8.19125 6.49575C8.19125 7.43975 7.55925 8.25275 6.41125 8.25275C5.33225 8.25275 4.63525 7.48675 4.63525 6.54275C4.63525 5.57375 5.31125 4.71875 6.41325 4.71875C7.51525 4.71875 8.16925 5.52675 8.19125 6.49575ZM4.63525 20.7188V9.16275H8.19125V20.7178L4.63525 20.7188ZM9.96825 13.1138C9.96825 11.7408 9.92325 10.5928 9.87825 9.60175H13.0723L13.2313 11.1327H13.2983C13.7483 10.4127 14.8513 9.35575 16.6963 9.35575C18.9463 9.35575 20.6353 10.8618 20.6353 14.1038V20.7188H17.0793V14.6187C17.0793 13.2017 16.5403 12.1208 15.3023 12.1208C14.3583 12.1208 13.8853 12.8857 13.6373 13.5157C13.5473 13.7407 13.5243 14.0557 13.5243 14.3717V20.7167H9.96825V13.1117V13.1138Z"
        fill={color}
      />
    </svg>
  );
};

Component1_4.propTypes = {
  color: PropTypes.string,
};

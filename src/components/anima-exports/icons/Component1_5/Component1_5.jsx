/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Component1_5 = ({ color = "black", className }) => {
  return (
    <svg
      className={`component-1-5 ${className}`}
      fill="none"
      height="25"
      viewBox="0 0 24 25"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M7.556 5.96841C7.556 6.91241 6.924 7.72541 5.776 7.72541C4.697 7.72541 4 6.95941 4 6.01541C4 5.04641 4.676 4.19141 5.778 4.19141C6.88 4.19141 7.534 4.99941 7.556 5.96841ZM4 20.1914V8.63541H7.556V20.1904L4 20.1914ZM9.333 12.5864C9.333 11.2134 9.288 10.0654 9.243 9.07441H12.437L12.596 10.6054H12.663C13.113 9.88541 14.216 8.82841 16.061 8.82841C18.311 8.82841 20 10.3344 20 13.5764V20.1914H16.444V14.0914C16.444 12.6744 15.905 11.5934 14.667 11.5934C13.723 11.5934 13.25 12.3584 13.002 12.9884C12.912 13.2134 12.889 13.5284 12.889 13.8444V20.1894H9.333V12.5844V12.5864Z"
        fill={color}
      />
    </svg>
  );
};

Component1_5.propTypes = {
  color: PropTypes.string,
};

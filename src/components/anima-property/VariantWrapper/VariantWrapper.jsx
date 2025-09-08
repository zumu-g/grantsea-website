/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const VariantWrapper = ({ variant, className }) => {
  return (
    <img
      className={`variant-wrapper variant-${variant} ${className}`}
      alt="Variant"
    />
  );
};

VariantWrapper.propTypes = {
  variant: PropTypes.oneOf([
    "sixteen",
    "twenty-five",
    "thirty-four",
    "seventeen",
    "ten",
    "twelve",
    "twenty-one",
    "five",
    "eight",
    "twenty-two",
    "twenty-seven",
    "twenty-eight",
    "twenty-three",
    "four",
    "eighteen",
    "one",
    "twenty-nine",
    "thirteen",
    "twenty-four",
    "thirty",
    "thirty-three",
    "twenty",
    "thirty-five",
    "three",
    "nine",
    "fourteen",
    "twenty-six",
    "seven",
    "fifteen",
    "two",
    "thirty-two",
    "nineteen",
    "eleven",
    "thirty-one",
    "six",
  ]),
};

import React from "react";
import { Component4 } from "../../components/Component4";
import "./style.css";

export const Screen4 = () => {
  return (
    <div className="screen-4">
      <div className="component-16">
        <Component4 className="variant-hover-true-9" text="MEN" variant="one" />
        <Component4 className="variant-hover-16" text="MEN" variant="one" />
      </div>

      <div className="x-axis-legend-3">
        <div className="text-wrapper-35">default</div>

        <div className="text-wrapper-36">hover</div>
      </div>
    </div>
  );
};

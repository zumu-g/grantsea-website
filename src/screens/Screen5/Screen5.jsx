import React from "react";
import { Component1 } from "../../components/Component1";
import "./style.css";

export const Screen5 = () => {
  return (
    <div className="screen-5">
      <div className="component-16">
        <Component1
          className="variant-hover-3"
          text="Become a member"
          variant="one"
        />
        <Component1
          className="variant-hover-true-3"
          text="Become a member"
          variant="one"
        />
      </div>

      <div className="x-axis-legend-5">
        <div className="text-wrapper-11">default</div>

        <div className="text-wrapper-12">hover</div>
      </div>
    </div>
  );
};

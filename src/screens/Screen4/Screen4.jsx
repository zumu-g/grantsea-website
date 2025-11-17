import React from "react";
import { ConcreteComponentNode } from "../../components/ConcreteComponentNode";
import "./style.css";

export const Screen4 = () => {
  return (
    <div className="screen-4">
      <div className="component-15">
        <ConcreteComponentNode className="variant-hover-2" variant="one" />
        <ConcreteComponentNode className="variant-hover-true-2" variant="one" />
      </div>

      <div className="x-axis-legend-4">
        <div className="text-wrapper-9">default</div>

        <div className="text-wrapper-10">hover</div>
      </div>
    </div>
  );
};

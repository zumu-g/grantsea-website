import React from "react";
import { Component } from "../../components/Component";
import "./style.css";

export const ComponentScreen = () => {
  return (
    <div className="component-screen">
      <div className="component-8">
        <div className="x-axis-legend">
          <div className="text-wrapper-2">default</div>

          <div className="text-wrapper-3">hover</div>
        </div>

        <div className="component-11">
          <Component
            className="variant-hover-true"
            text="Add to bag"
            variant="one"
          />
          <Component
            className="variant-hover"
            text="Add to bag"
            variant="one"
          />
        </div>
      </div>
    </div>
  );
};

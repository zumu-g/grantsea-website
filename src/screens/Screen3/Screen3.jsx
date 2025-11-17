import React from "react";
import { Component9 } from "../../components/Component9";
import { Variant16 } from "../../icons/Variant16";
import "./style.css";

export const Screen3 = () => {
  return (
    <div className="screen-3">
      <div className="component-14">
        <Component9
          className="design-component-instance-node"
          hover={false}
          override={<Variant16 className="component-9-1" />}
          text="Select a size"
          variant="one"
        />
        <Component9
          className="design-component-instance-node"
          hover
          override={<Variant16 className="component-9-1" />}
          text="Select a size"
          variant="one"
        />
      </div>

      <div className="x-axis-legend-3">
        <div className="text-wrapper-7">default</div>

        <div className="text-wrapper-8">hover</div>
      </div>
    </div>
  );
};

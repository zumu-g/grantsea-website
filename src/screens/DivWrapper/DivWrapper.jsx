import React from "react";
import { VariantHoverWrapper } from "../../components/VariantHoverWrapper";
import "./style.css";

export const DivWrapper = () => {
  return (
    <div className="div-wrapper">
      <div className="component-13">
        <VariantHoverWrapper
          className="component-9-instance"
          text="MEN"
          variant="one"
        />
        <VariantHoverWrapper
          className="component-9-instance"
          text="MEN"
          variant="one"
        />
      </div>

      <div className="x-axis-legend-2">
        <div className="text-wrapper-5">default</div>

        <div className="text-wrapper-6">hover</div>
      </div>
    </div>
  );
};

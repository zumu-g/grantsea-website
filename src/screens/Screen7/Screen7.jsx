import React from "react";
import { Component2 } from "../../components/Component2";
import "./style.css";

export const Screen7 = () => {
  return (
    <div className="screen-7">
      <div className="component-33">
        <Component2 className="component-2-instance" hover variant="one" />
        <Component2 className="variant-hover-4" hover={false} variant="one" />
        <Component2 className="variant-hover-true-4" hover variant="two" />
        <Component2 className="variant-hover-5" hover={false} variant="two" />
        <Component2 className="variant-hover-true-5" hover variant="three" />
        <Component2 className="variant-hover-6" hover={false} variant="three" />
        <Component2 className="variant-hover-7" hover={false} variant="four" />
        <Component2 className="variant-hover-8" hover={false} variant="five" />
        <Component2 className="variant-hover-9" hover={false} variant="six" />
      </div>

      <div className="x-axis-legend-6">
        <div className="text-wrapper-32">default</div>

        <div className="text-wrapper-33">hover</div>
      </div>

      <div className="y-axis-legend-2">
        <p className="variant-39">
          <span className="text-wrapper-34">
            variant
            <br />
          </span>

          <span className="text-wrapper-35">1</span>
        </p>

        <p className="variant-40">
          <span className="text-wrapper-34">
            variant
            <br />
          </span>

          <span className="text-wrapper-35">2</span>
        </p>

        <p className="variant-41">
          <span className="text-wrapper-34">
            variant
            <br />
          </span>

          <span className="text-wrapper-35">3</span>
        </p>

        <p className="variant-42">
          <span className="text-wrapper-34">
            variant
            <br />
          </span>

          <span className="text-wrapper-35">4</span>
        </p>

        <p className="variant-43">
          <span className="text-wrapper-34">
            variant
            <br />
          </span>

          <span className="text-wrapper-35">5</span>
        </p>

        <p className="variant-44">
          <span className="text-wrapper-34">
            variant
            <br />
          </span>

          <span className="text-wrapper-35">6</span>
        </p>
      </div>
    </div>
  );
};

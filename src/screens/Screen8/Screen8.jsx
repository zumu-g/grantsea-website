import React from "react";
import { Component10 } from "../../components/Component10";
import "./style.css";

export const Screen8 = () => {
  return (
    <div className="screen-8">
      <div className="component-34">
        <Component10 className="component-10-instance" hover variant="one" />
        <Component10 className="variant-hover-10" hover={false} variant="one" />
        <Component10 className="variant-hover-true-6" hover variant="two" />
        <Component10 className="variant-hover-11" hover={false} variant="two" />
        <Component10 className="variant-hover-true-7" hover variant="three" />
        <Component10
          className="variant-hover-12"
          hover={false}
          variant="three"
        />
        <Component10 className="variant-hover-true-8" hover variant="four" />
        <Component10
          className="variant-hover-13"
          hover={false}
          variant="four"
        />
        <Component10 className="variant-hover-true-9" hover variant="five" />
        <Component10
          className="variant-hover-14"
          hover={false}
          variant="five"
        />
        <Component10 className="variant-hover-true-10" hover variant="six" />
        <Component10 className="variant-hover-15" hover={false} variant="six" />
        <Component10 className="variant-hover-true-11" hover variant="seven" />
        <Component10
          className="variant-hover-16"
          hover={false}
          variant="seven"
        />
        <Component10
          className="variant-hover-17"
          hover={false}
          variant="eight"
        />
        <Component10
          className="variant-hover-18"
          hover={false}
          variant="nine"
        />
      </div>

      <div className="x-axis-legend-7">
        <div className="text-wrapper-36">default</div>

        <div className="text-wrapper-37">hover</div>
      </div>

      <div className="y-axis-legend-3">
        <p className="variant-45">
          <span className="text-wrapper-38">
            variant
            <br />
          </span>

          <span className="text-wrapper-39">1</span>
        </p>

        <p className="variant-46">
          <span className="text-wrapper-38">
            variant
            <br />
          </span>

          <span className="text-wrapper-39">2</span>
        </p>

        <p className="variant-47">
          <span className="text-wrapper-38">
            variant
            <br />
          </span>

          <span className="text-wrapper-39">3</span>
        </p>

        <p className="variant-48">
          <span className="text-wrapper-38">
            variant
            <br />
          </span>

          <span className="text-wrapper-39">4</span>
        </p>

        <p className="variant-49">
          <span className="text-wrapper-38">
            variant
            <br />
          </span>

          <span className="text-wrapper-39">5</span>
        </p>

        <p className="variant-50">
          <span className="text-wrapper-38">
            variant
            <br />
          </span>

          <span className="text-wrapper-39">6</span>
        </p>

        <p className="variant-51">
          <span className="text-wrapper-38">
            variant
            <br />
          </span>

          <span className="text-wrapper-39">7</span>
        </p>

        <p className="variant-52">
          <span className="text-wrapper-38">
            variant
            <br />
          </span>

          <span className="text-wrapper-39">8</span>
        </p>

        <p className="variant-53">
          <span className="text-wrapper-38">
            variant
            <br />
          </span>

          <span className="text-wrapper-39">9</span>
        </p>
      </div>
    </div>
  );
};

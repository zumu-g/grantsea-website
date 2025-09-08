import React from "react";
import { Component3 } from "../../components/Component3";
import "./style.css";

export const Screen9 = () => {
  return (
    <div className="screen-9">
      <div className="component-35">
        <Component3 className="component-3-instance" hover variant="one" />
        <Component3 className="variant-hover-19" hover={false} variant="one" />
        <Component3 className="variant-hover-true-12" hover variant="two" />
        <Component3 className="variant-hover-20" hover={false} variant="two" />
        <Component3
          className="variant-hover-21"
          hover={false}
          variant="three"
        />
        <Component3 className="variant-hover-22" hover={false} variant="four" />
        <Component3 className="variant-hover-true-13" hover variant="five" />
        <Component3 className="variant-hover-23" hover={false} variant="five" />
        <Component3 className="variant-hover-true-14" hover variant="six" />
        <Component3 className="variant-hover-24" hover={false} variant="six" />
        <Component3
          className="variant-hover-25"
          hover={false}
          variant="seven"
        />
        <Component3 className="variant-hover-true-15" hover variant="eight" />
        <Component3
          className="variant-hover-26"
          hover={false}
          variant="eight"
        />
        <Component3 className="variant-hover-true-16" hover variant="nine" />
        <Component3 className="variant-hover-27" hover={false} variant="nine" />
      </div>

      <div className="x-axis-legend-8">
        <div className="text-wrapper-40">default</div>

        <div className="text-wrapper-41">hover</div>
      </div>

      <div className="y-axis-legend-4">
        <p className="variant-54">
          <span className="text-wrapper-42">
            variant
            <br />
          </span>

          <span className="text-wrapper-43">1</span>
        </p>

        <p className="variant-55">
          <span className="text-wrapper-42">
            variant
            <br />
          </span>

          <span className="text-wrapper-43">2</span>
        </p>

        <p className="variant-56">
          <span className="text-wrapper-42">
            variant
            <br />
          </span>

          <span className="text-wrapper-43">3</span>
        </p>

        <p className="variant-57">
          <span className="text-wrapper-42">
            variant
            <br />
          </span>

          <span className="text-wrapper-43">4</span>
        </p>

        <p className="variant-58">
          <span className="text-wrapper-42">
            variant
            <br />
          </span>

          <span className="text-wrapper-43">5</span>
        </p>

        <p className="variant-59">
          <span className="text-wrapper-42">
            variant
            <br />
          </span>

          <span className="text-wrapper-43">6</span>
        </p>

        <p className="variant-60">
          <span className="text-wrapper-42">
            variant
            <br />
          </span>

          <span className="text-wrapper-43">7</span>
        </p>

        <p className="variant-61">
          <span className="text-wrapper-42">
            variant
            <br />
          </span>

          <span className="text-wrapper-43">8</span>
        </p>

        <p className="variant-62">
          <span className="text-wrapper-42">
            variant
            <br />
          </span>

          <span className="text-wrapper-43">9</span>
        </p>
      </div>
    </div>
  );
};

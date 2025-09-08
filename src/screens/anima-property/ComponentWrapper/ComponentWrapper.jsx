import React from "react";
import { Component } from "../../components/Component";
import { Component1_39 } from "../../icons/Component1_39";
import { Component1_79 } from "../../icons/Component1_79";
import { Variant3 } from "../../icons/Variant3";
import { Variant4 } from "../../icons/Variant4";
import { Variant9 } from "../../icons/Variant9";
import { Variant11 } from "../../icons/Variant11";
import "./style.css";

export const ComponentWrapper = () => {
  return (
    <div className="component-wrapper">
      <div className="component-11">
        <Component
          className="variant-hover-true"
          hover
          icon={<Component1_39 className="component-12" />}
          variant="one"
        />
        <Component
          className="variant-hover"
          hover={false}
          icon={<Component1_39 className="component-12" />}
          variant="one"
        />
        <Component
          className="component-2-instance"
          hover
          icon={<Variant3 className="component-12" />}
          variant="two"
        />
        <Component
          className="variant-hover-2"
          hover={false}
          icon={<Variant3 className="component-12" />}
          variant="two"
        />
        <Component
          className="variant-hover-true-2"
          hover
          icon={<Variant4 className="component-12" />}
          variant="three"
        />
        <Component
          className="variant-hover-3"
          hover={false}
          icon={<Variant4 className="component-12" />}
          variant="three"
        />
        <Component
          className="variant-hover-4"
          hover={false}
          icon={<Variant9 className="component-13" />}
          variant="four"
        />
        <Component
          className="variant-hover-5"
          hover={false}
          icon={<Variant11 className="component-13" />}
          variant="five"
        />
        <Component
          className="variant-hover-6"
          hover={false}
          icon={<Component1_79 className="component-1-79-instance" />}
          variant="six"
        />
      </div>

      <div className="x-axis-legend">
        <div className="text-wrapper-27">default</div>

        <div className="text-wrapper-28">hover</div>
      </div>

      <div className="y-axis-legend-2">
        <p className="variant-50">
          <span className="text-wrapper-29">
            variant
            <br />
          </span>

          <span className="text-wrapper-30">1</span>
        </p>

        <p className="variant-51">
          <span className="text-wrapper-29">
            variant
            <br />
          </span>

          <span className="text-wrapper-30">2</span>
        </p>

        <p className="variant-52">
          <span className="text-wrapper-29">
            variant
            <br />
          </span>

          <span className="text-wrapper-30">3</span>
        </p>

        <p className="variant-53">
          <span className="text-wrapper-29">
            variant
            <br />
          </span>

          <span className="text-wrapper-30">4</span>
        </p>

        <p className="variant-54">
          <span className="text-wrapper-29">
            variant
            <br />
          </span>

          <span className="text-wrapper-30">5</span>
        </p>

        <p className="variant-55">
          <span className="text-wrapper-29">
            variant
            <br />
          </span>

          <span className="text-wrapper-30">6</span>
        </p>
      </div>
    </div>
  );
};

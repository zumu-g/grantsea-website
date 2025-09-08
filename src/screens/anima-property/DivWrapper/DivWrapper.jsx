import React from "react";
import { Component10 } from "../../components/Component10";
import { Component1_4 } from "../../icons/Component1_4";
import { Component1_10 } from "../../icons/Component1_10";
import { Component1_14 } from "../../icons/Component1_14";
import { Component1_60 } from "../../icons/Component1_60";
import { Component1_61 } from "../../icons/Component1_61";
import { Component1_62 } from "../../icons/Component1_62";
import { Component1_64 } from "../../icons/Component1_64";
import { Component1_67 } from "../../icons/Component1_67";
import { Variant30 } from "../../icons/Variant30";
import "./style.css";

export const DivWrapper = () => {
  return (
    <div className="div-wrapper">
      <div className="component-14">
        <Component10
          className="component-10-instance"
          hover
          icon={<Component1_61 className="component-15" color="#4D4D4D" />}
          variant="one"
        />
        <Component10
          className="variant-hover-7"
          hover={false}
          icon={<Component1_61 className="component-15" color="black" />}
          variant="one"
        />
        <Component10
          className="variant-hover-true-3"
          hover
          icon={<Component1_62 className="component-15" color="#4D4D4D" />}
          variant="two"
        />
        <Component10
          className="variant-hover-8"
          hover={false}
          icon={<Component1_62 className="component-15" color="black" />}
          variant="two"
        />
        <Component10
          className="variant-hover-true-4"
          hover
          icon={<Component1_4 className="component-15" color="#4D4D4D" />}
          variant="three"
        />
        <Component10
          className="variant-hover-9"
          hover={false}
          icon={<Component1_4 className="component-15" color="black" />}
          variant="three"
        />
        <Component10
          className="variant-hover-true-5"
          hover
          icon={<Component1_64 className="component-15" color="#4D4D4D" />}
          variant="four"
        />
        <Component10
          className="variant-hover-10"
          hover={false}
          icon={<Component1_64 className="component-15" color="black" />}
          variant="four"
        />
        <Component10
          className="variant-hover-true-6"
          hover
          icon={<Variant30 className="component-15" color="#4D4D4D" />}
          variant="five"
        />
        <Component10
          className="variant-hover-11"
          hover={false}
          icon={<Variant30 className="component-15" color="black" />}
          variant="five"
        />
        <Component10
          className="variant-hover-true-7"
          hover
          icon={<Component1_10 className="component-15" color="#4D4D4D" />}
          variant="six"
        />
        <Component10
          className="variant-hover-12"
          hover={false}
          icon={<Component1_10 className="component-15" color="black" />}
          variant="six"
        />
        <Component10
          className="variant-hover-true-8"
          hover
          icon={<Component1_67 className="component-15" color="#4D4D4D" />}
          variant="seven"
        />
        <Component10
          className="variant-hover-13"
          hover={false}
          icon={<Component1_67 className="component-15" color="black" />}
          variant="seven"
        />
        <Component10
          className="variant-hover-14"
          hover={false}
          icon={<Component1_14 className="component-15" />}
          variant="eight"
        />
        <Component10
          className="variant-hover-15"
          hover={false}
          icon={<Component1_60 className="component-15" />}
          variant="nine"
        />
      </div>

      <div className="x-axis-legend-2">
        <div className="text-wrapper-31">default</div>

        <div className="text-wrapper-32">hover</div>
      </div>

      <div className="y-axis-legend-3">
        <p className="variant-56">
          <span className="text-wrapper-33">
            variant
            <br />
          </span>

          <span className="text-wrapper-34">1</span>
        </p>

        <p className="variant-57">
          <span className="text-wrapper-33">
            variant
            <br />
          </span>

          <span className="text-wrapper-34">2</span>
        </p>

        <p className="variant-58">
          <span className="text-wrapper-33">
            variant
            <br />
          </span>

          <span className="text-wrapper-34">3</span>
        </p>

        <p className="variant-59">
          <span className="text-wrapper-33">
            variant
            <br />
          </span>

          <span className="text-wrapper-34">4</span>
        </p>

        <p className="variant-60">
          <span className="text-wrapper-33">
            variant
            <br />
          </span>

          <span className="text-wrapper-34">5</span>
        </p>

        <p className="variant-61">
          <span className="text-wrapper-33">
            variant
            <br />
          </span>

          <span className="text-wrapper-34">6</span>
        </p>

        <p className="variant-62">
          <span className="text-wrapper-33">
            variant
            <br />
          </span>

          <span className="text-wrapper-34">7</span>
        </p>

        <p className="variant-63">
          <span className="text-wrapper-33">
            variant
            <br />
          </span>

          <span className="text-wrapper-34">8</span>
        </p>

        <p className="variant-64">
          <span className="text-wrapper-33">
            variant
            <br />
          </span>

          <span className="text-wrapper-34">9</span>
        </p>
      </div>
    </div>
  );
};

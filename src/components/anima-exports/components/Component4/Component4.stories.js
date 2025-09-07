import { Component4 } from ".";

export default {
  title: "Components/Component4",
  component: Component4,

  argTypes: {
    variant: {
      options: ["seven", "two", "three", "four", "one", "five", "six"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    text: "Shoes",
    variant: "seven",
    hover: true,
    className: {},
    component186StyleOverrideClassName: {},
  },
};

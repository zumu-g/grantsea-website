import { Component6 } from ".";

export default {
  title: "Components/Component6",
  component: Component6,

  argTypes: {
    variant: {
      options: ["two", "three", "four", "one", "five", "six"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    text: "Cloud",
    variant: "two",
    hover: true,
    component186StyleOverrideClassName: {},
  },
};

import { Component5 } from ".";

export default {
  title: "Components/Component5",
  component: Component5,

  argTypes: {
    variant: {
      options: ["one"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    text: "Running",
    variant: "one",
    hover: true,
    className: {},
    component156StyleOverrideClassName: {},
    textClassName: {},
  },
};

import { Component9 } from ".";

export default {
  title: "Components/Component9",
  component: Component9,

  argTypes: {
    variant: {
      options: ["one"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    variant: "one",
    className: {},
  },
};

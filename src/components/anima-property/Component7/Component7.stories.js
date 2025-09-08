import { Component7 } from ".";

export default {
  title: "Components/Component7",
  component: Component7,

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

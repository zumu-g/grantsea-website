import { Component4 } from ".";

export default {
  title: "Components/Component4",
  component: Component4,

  argTypes: {
    variant: {
      options: ["one"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    text: "Men",
    variant: "one",
    className: {},
  },
};

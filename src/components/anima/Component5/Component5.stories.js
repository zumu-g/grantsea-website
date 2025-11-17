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
    text: "Select a size",
    variant: "one",
    className: {},
  },
};

import { Component8 } from ".";

export default {
  title: "Components/Component8",
  component: Component8,

  argTypes: {
    variant: {
      options: ["one"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    text: "Read more",
    variant: "one",
    className: {},
  },
};

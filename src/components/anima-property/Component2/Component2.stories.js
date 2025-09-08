import { Component2 } from ".";

export default {
  title: "Components/Component2",
  component: Component2,

  argTypes: {
    variant: {
      options: ["two", "three", "four", "one", "five", "six"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    variant: "two",
    hover: true,
    className: {},
  },
};

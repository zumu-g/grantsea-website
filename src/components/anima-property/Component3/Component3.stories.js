import { Component3 } from ".";

export default {
  title: "Components/Component3",
  component: Component3,

  argTypes: {
    variant: {
      options: [
        "seven",
        "two",
        "three",
        "nine",
        "four",
        "one",
        "five",
        "eight",
        "six",
      ],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    variant: "seven",
    hover: true,
    className: {},
  },
};

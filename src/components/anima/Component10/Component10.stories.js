import { Component10 } from ".";

export default {
  title: "Components/Component10",
  component: Component10,

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

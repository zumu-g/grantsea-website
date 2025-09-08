import { Component12 } from ".";

export default {
  title: "Components/Component12",
  component: Component12,

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

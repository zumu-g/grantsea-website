import { Component11 } from ".";

export default {
  title: "Components/Component11",
  component: Component11,

  argTypes: {
    variant: {
      options: ["one"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    text: "Terms & conditions",
    variant: "one",
    className: {},
  },
};

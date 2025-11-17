import { Component1 } from ".";

export default {
  title: "Components/Component1",
  component: Component1,

  argTypes: {
    variant: {
      options: ["one"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    text: "Become a member",
    variant: "one",
    className: {},
  },
};

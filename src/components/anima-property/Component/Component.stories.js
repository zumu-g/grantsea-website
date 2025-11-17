import { Component } from ".";

export default {
  title: "Components/Component",
  component: Component,

  argTypes: {
    variant: {
      options: ["one"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    text: "Add to bag",
    variant: "one",
    className: {},
  },
};

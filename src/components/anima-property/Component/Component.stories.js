import { Component } from ".";

export default {
  title: "Components/Component",
  component: Component,

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

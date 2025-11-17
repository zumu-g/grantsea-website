import { VariantHoverWrapper } from ".";

export default {
  title: "Components/VariantHoverWrapper",
  component: VariantHoverWrapper,

  argTypes: {
    variant: {
      options: ["one"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    text: "Men",
    variant: "one",
    className: {},
  },
};

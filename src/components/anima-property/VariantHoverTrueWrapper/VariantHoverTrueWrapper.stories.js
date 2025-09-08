import { VariantHoverTrueWrapper } from ".";

export default {
  title: "Components/VariantHoverTrueWrapper",
  component: VariantHoverTrueWrapper,

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

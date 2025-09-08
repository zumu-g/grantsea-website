import { VariantWrapper } from ".";

export default {
  title: "Components/VariantWrapper",
  component: VariantWrapper,

  argTypes: {
    variant: {
      options: [
        "sixteen",
        "twenty-five",
        "thirty-four",
        "seventeen",
        "ten",
        "twelve",
        "twenty-one",
        "five",
        "eight",
        "twenty-two",
        "twenty-seven",
        "twenty-eight",
        "twenty-three",
        "four",
        "eighteen",
        "one",
        "twenty-nine",
        "thirteen",
        "twenty-four",
        "thirty",
        "thirty-three",
        "twenty",
        "thirty-five",
        "three",
        "nine",
        "fourteen",
        "twenty-six",
        "seven",
        "fifteen",
        "two",
        "thirty-two",
        "nineteen",
        "eleven",
        "thirty-one",
        "six",
      ],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    variant: "sixteen",
    className: {},
  },
};

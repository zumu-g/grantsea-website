
import 

 
 { 
  
    VariantHoverTrueWrapper  
    
   }

from
"."

export default {
  title: 'Components/VariantHoverTrueWrapper',
  component: VariantHoverTrueWrapper,
  
  argTypes: {
    variant: {
   options: ['one'], control: { type: "select"} 
}
  }
  
};

export const Default = {
  args: {
    text: 'Shop men's',
variant: 'one',
className: {},
containerClassName: {},

  },
};

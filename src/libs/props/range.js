import { createPropType } from '../utils'

export default function (min, max) {
  return createPropType((props, propName, componentName) => {
    console.log(2, props, propName, componentName)
    const value = props[propName];

    if(value < min || value > max) {
      return new Error(`Invalid prop ${propName} of ${componentName}, should between ${min} and ${max}.`);
    }
  })
}

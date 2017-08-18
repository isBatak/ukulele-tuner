export function scaleRange(input, inputRange, outputRange) {
  const [inMin, inMax] = inputRange;
  const [outMin, outMax] = outputRange;
  return ((input - inMin) / (inMax - inMin) * (outMax - outMin) + outMin);
}
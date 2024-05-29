export function randomColor() {
  return colorByPercentage(Math.random());
}

/**
 *
 * @param {number} percentage from 0 to 1
 * @returns
 */
export function colorByPercentage(percentage) {
  const checkpoints = {
    0: [255, 0, 0],
    20: [255, 255, 0],
    40: [0, 255, 0],
    60: [0, 255, 255],
    80: [0, 0, 255],
    100: [255, 0, 255],
  };
  const percentageInt = Math.round(percentage * 100);
  const percentageKeys = Object.keys(checkpoints).map((key) => parseInt(key));
  if (percentageKeys.includes(percentageInt)) {
    return `rgb(${checkpoints[percentageInt.toString()].join(", ")})`;
  }
  const lowerBound = percentageKeys
    .filter((key) => key < percentageInt)
    .sort((a, b) => a - b)
    .pop();
  const upperBound = percentageKeys
    .filter((key) => key > percentageInt)
    .sort((a, b) => a - b)
    .shift();
  const lowerColor = checkpoints[lowerBound];
  const upperColor = checkpoints[upperBound];
  if (!lowerColor || !upperColor) {
    throw new Error("Invalid color bounds");
  }

  const ratio = (percentageInt - lowerBound) / (upperBound - lowerBound);
  const mixedColor = lowerColor.map((lowerColorPart, index) => {
    const upperColorPart = upperColor[index];
    return Math.round(lowerColorPart + ratio * (upperColorPart - lowerColorPart));
  });

  return `rgb(${mixedColor.join(", ")})`;
}

export function lighten(rgbColorString) {
  const rgb = rgbColorString
    .slice(4, -1)
    .split(", ")
    .map((color) => parseInt(color));
  const ratio = 0.5;
  const lightenedColor = rgb.map((color) => Math.round(color + (255 - color) * ratio));
  return `rgb(${lightenedColor.join(", ")})`;
}

export function darken(rgbColorString) {
  const rgb = rgbColorString
    .slice(4, -1)
    .split(", ")
    .map((color) => parseInt(color));
  const ratio = 0.7;
  const darkenedColor = rgb.map((color) => Math.round(color * ratio));
  return `rgb(${darkenedColor.join(", ")})`;
}

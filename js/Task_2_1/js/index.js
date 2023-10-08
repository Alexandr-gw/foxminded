function initRandomColor() {
  document.getElementById("button").addEventListener("click", function setRandomColor() {
    const randomRGBColor = getRandomRgbColor();
    const randomHexColor = getRandomHexColor(randomRGBColor);
    const isColorFound = randomHexColor === Object.values(CSS_COLOR_NAMES).find(obj => obj === randomHexColor);
    const foundColorName = isColorFound ? Object.keys(CSS_COLOR_NAMES).find(key => CSS_COLOR_NAMES[key] === randomHexColor) : null;

    document.getElementById("wrapper").style.backgroundColor = isColorFound ? randomHexColor : `Rgb(${randomRGBColor})`;
    document.getElementById("colorCode").innerHTML = isColorFound ? foundColorName : `Rgb(${randomRGBColor})`;
  });

  const getRandomNumber = (limit) => {
    return Math.floor(Math.random() * limit);
  };

  const getRandomRgbColor = () => {
    const r = getRandomNumber(255);
    const g = getRandomNumber(255);
    const b = getRandomNumber(255);

    return [r, g, b]
  };

  const getRandomHexColor = (rgbColorArr) => {
    const [r, g, b] = rgbColorArr;

    const hr = r.toString(16).padStart(2, '0').toUpperCase();
    const hg = g.toString(16).padStart(2, '0').toUpperCase();
    const hb = b.toString(16).padStart(2, '0').toUpperCase();

    return "#" + hr + hg + hb;
  };
}
window.addEventListener("DOMContentLoaded", initRandomColor)
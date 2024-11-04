import converter from "./converter.js";

const rgbPreviewInHex = document.querySelector('#rgb-preview-hex');
const rgbPreviewInRgb = document.querySelector('#rgb-preview-rgb');

function convertHexToRGB() {
  const rgbR = document.querySelector('#rgb-r');
  const rgbG = document.querySelector('#rgb-g');
  const rgbB = document.querySelector('#rgb-b');
  const inputHEX = document.querySelector('#input-hex')
  const rgbCSS = document.querySelector('#rgb-css');

  const rgb = converter.hexToRgb(`${inputHEX.value}`)
  rgbR.value = rgb.r;
  rgbG.value = rgb.g;
  rgbB.value = rgb.b;
  rgbCSS.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  rgbPreviewInHex.style.backgroundColor = rgbCSS.value;
}

function resetHex() {
  rgbPreviewInHex.style.backgroundColor = 'rgb(255, 255, 255)';

  Array.from(document.querySelector('.container--rgb-to-hex').children)
    .filter((child) => child.tagName.toLowerCase() === 'input')
    .forEach((node) => node.value = '');
}

const alignInputAndSlider = (input) => {
  const value = input.target.value;
  // const preview = document.querySelector('#rgb-preview-hex');

  Array.from(input.target.parentNode.children)
    .filter((node) => node.tagName.toLowerCase() === 'input')
    .forEach((node) => node.value = value);

  const [r, g, b] = Array.from(input.target.parentNode.parentNode.children)
    .filter((node) => node.classList.contains('container-slider-wrapper'))
    .map((node) => Array.from(node.children).find((node) => node.classList.contains('input--set-rgb-number')))
    .map((node) => node.value);

  rgbPreviewInRgb.style.backgroundColor = `rgb(${r || 0}, ${g || 0}, ${b || 0})`;
}

Array.from(document.querySelectorAll('input'))
  .filter((input) => {
    const list = input.classList;
    return list.contains('input--set-rgb-number') || list.contains('input--set-rgb-range');
  })
  .forEach((input) => input.addEventListener('input', alignInputAndSlider));

const btnResetHex = document.querySelector('#btn-reset-hex');
const btnConvertHex = document.querySelector('#btn-convert-hex');
btnResetHex.addEventListener('click', resetHex);
btnConvertHex.addEventListener('click', convertHexToRGB);

const rgbContainer = document.querySelector('.container--rgb-to-hex');

function convertRgbToHex() {
  const RgbCode = document.querySelector('#rgb-code');
  const HexCode = document.querySelector('#hex-code');

  const setRgbR = document.querySelector('#set-rgb-r');
  const setRgbG = document.querySelector('#set-rgb-g');
  const setRgbB = document.querySelector('#set-rgb-b');

  const newR = setRgbR.value;
  const newG = setRgbG.value;
  const newB = setRgbB.value;
  const newHex = converter.rgbToHex(newR, newG, newB);

  HexCode.value = newHex;
  RgbCode.value = `rgb(${newR}, ${newG}, ${newB})`;
}

function resetRgb() {
  rgbPreviewInRgb.style.backgroundColor = 'rgb(255, 255, 255)';

  Array.from(rgbContainer.querySelectorAll('input'))
    .filter((child) => child.tagName.toLowerCase() === 'input')
    .forEach((node) => {
      console.log(node.type, { node });

      if (node.type === 'number' || node.type === 'range') {
        node.value = 0;
      } else {
        node.value = ''
      }
    });
}

function handleMaxInput(e) {
  const target = e.target;

  if (target && target.classList.contains('input--set-rgb-number')) {
    const value = target.value;

    if (value > 255) {
      target.value = 255;
    }
  }
}

const btnResetRgb = document.querySelector('#btn-reset-rgb');
const btnConvertRgb = document.querySelector('#btn-convert-rgb');
btnResetRgb.addEventListener('click', resetRgb);
btnConvertRgb.addEventListener('click', convertRgbToHex); 

rgbContainer.addEventListener('input', handleMaxInput);


'use strict';

const CHAR_CODE_SUBTRACTION_NUM = '7'.charCodeAt();
const HEX_BASE = 16;
let count = 0;

function hexToDecimal (hex) {
  const arr = hex.toUpperCase().split('');
  const length = arr.length;

  let decimalResult = 0;

  for (let i = 0; i < length; i++) {
    const ch = arr[length - i - 1];
    console.log('length: ' + length);
    // console.log(`${count} + ': ch: ' + ${ch}`);
    const num = ('ABCDEF'.includes(ch))
      ? ch.charCodeAt() - CHAR_CODE_SUBTRACTION_NUM // charCode of A is 65 and charCode of '7' is 55.
      : +(ch);

    decimalResult += num * Math.pow(HEX_BASE, i);

  }
    console.log(count + ': deimal result: ', decimalResult);
    count++;
  return decimalResult;
}

function hexToRgb(hex) {
  const arr = hex.split('');

  const rgb = {
    r: 0,
    g: 0,
    b: 0,
  };

  switch(arr.length) {
    case 3: {
      rgb.r = hexToDecimal(`${arr[0]}${arr[0]}`);
      console.log(`${arr[0]}${arr[0]}`);
      rgb.g = hexToDecimal(`${arr[1]}${arr[1]}`);
      console.log(`${arr[1]}${arr[1]}`);
      rgb.b = hexToDecimal(`${arr[2]}${arr[2]}`);
      console.log(`${arr[2]}${arr[2]}`);
    }
    case 6: {
      rgb.r = hexToDecimal(`${arr[0]}${arr[1]}`);
      rgb.g = hexToDecimal(`${arr[2]}${arr[3]}`);
      rgb.b = hexToDecimal(`${arr[4]}${arr[5]}`);
    }
  }
  
  console.log({ rgb });
  return rgb;
}

function decimalToHex(decimal) {
  let hex = '';
  let next = decimal;

  while (next > 0) {
    const remainder = next % HEX_BASE;

    hex = hex + (remainder < 10 ? remainder : String.fromCharCode(remainder + CHAR_CODE_SUBTRACTION_NUM));
    next = Math.floor(next / HEX_BASE);
  }

  return hex;
}

function rgbToHex(r, g, b) {
  return decimalToHex(r) + decimalToHex(g) + decimalToHex(b);
}

export default {
  rgbToHex,
  hexToRgb,
};

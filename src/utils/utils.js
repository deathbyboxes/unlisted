

export function RealTime() {
  let date = new Date();
  let hours = date.getHours();
  let mins = date.getMinutes();

  return `${hours % 12 || 12}:${mins} ${hours > 11 ? "PM" : "AM"}`;
}

export function RandomNumber(min, max, isInt) {
  let num = Math.random() * (max - min + 1) + min;
  if (isInt) num = round(num);
  else num = round(num, 2);
  return num;
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
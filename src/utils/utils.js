export function formatDate(d) {
  let fmtDate = ""
  let month = d.getMonth();
  let date = d.getDate();
  let hours = d.getHours();
  let mins = d.getMinutes().toString().padStart(2,'0');
  let today = new Date();

  let daysAgo =  Math.abs(date - today.getDate());
  if (daysAgo === 0) fmtDate += `Today, `
  else if (daysAgo === 1) fmtDate += `Yesterday, `
  else fmtDate += `${month + 1}/${date}, `
  fmtDate += `${hours % 12 || 12}:${mins} ${hours > 11 ? "PM" : "AM"}`

  return fmtDate;
}

export function createDate(d, h, m) {
  let newDate = new Date();
  newDate.setDate(newDate.getDate() - d);
  newDate.setHours(h)
  newDate.setMinutes(m)
  return newDate;
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

export function formatNumber(phone) {
  let phoneArr = phone.split("")
  if (phoneArr.length >= 10)
    return `(${phoneArr.splice(0,3).join("")}) ${phoneArr.splice(0,3).join("")}-${phoneArr.join("")}`
  else
    return `${phoneArr.join("")}`
}

export function messageState() {
  return {
    UNREAD: 0,
    READ: 1,
    DRAFT: 2
  }
}
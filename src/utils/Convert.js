export const convertTitle = (title) => {
  const newStr = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/%/g, '')
    .replace(/-/g, '')
    .replace(/[^a-zA-Z 0-9]+/g, '')
    .replace(/\s+/g, '-');
  return newStr;
};

export const convertDate = (date) => {
  if (date) return date.split('-').reverse().join('-');
};

export const convertList = (list) => {
  let listDisplay = '';
  if (list) list.map((listItem) => (listDisplay += listItem + ', '));
  return listDisplay.slice(0, listDisplay.length - 2);
};

export const formatDate = (date) => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return date
    .toLocaleDateString('en-GB', options)
    .slice(0, -5)
    .replace(',', '');
};

export const formatTime = (time) => {
  return time.slice(0, 2) <= 12 ? (time += ' AM') : (time += ' PM');
};

export const formatMoney = (money) => {
  return money
    .toFixed(0)
    .toString()
    .split(/(?=(?:\d{3})+(?:\.|$))/g)
    .join('.');
};

function validation(data) {
  // есть пробел
  const space = /\d{1,2}\.\d{5},\s-\d{1,2}\.\d{5}/g.test(data);

  // нет пробела
  const noSpace = /\d{1,2}\.\d{5},-\d{1,2}\.\d{5}/g.test(data);

  // квадратные скобки
  const squareBrackets = /\[\d{1,2}\.\d{5},\s-\d{1,2}\.\d{5}\]/g.test(data);

  if (space || noSpace || squareBrackets) {
    return true;
  }
  return false;
}

export default validation;

// 51.34545, -0.34521

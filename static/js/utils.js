export const debounce = (callback, wait) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), wait);
  }
};

export const generateCalendarMonth = (dateStr) => {
  const monthTable = document.createElement('table');
  const monthAndYearContent = document.createElement('caption');
  const tableMonthBody = generateMonthTableBody(dateStr);
  monthAndYearContent.innerText = getMonthAndYear(dateStr);
  monthTable.appendChild(monthAndYearContent);
  monthTable.appendChild(generateMonthTableHead());
  monthTable.appendChild(tableMonthBody);
  return monthTable;
};

export const getRandomHexColor = () => {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
};

export const getDateFromStr = (dateStr) => new Date(dateStr);

export const getDateElementFromCalendarMonth = (calendarMonth, date) => {
  const day = (date.getDate()).toString();
  for (let element of calendarMonth.querySelectorAll('td')) {
    if (element.textContent === day) return element;
  };
};

const generateMonthTableHead = () => {
  const monthTableHead = document.createElement('thead');
  monthTableHead.appendChild(generateDaysOfWeekRow());
  return monthTableHead;
};

const generateMonthTableBody = (dateStr) => {
  const monthTableBody = document.createElement('tbody');
  const firstDay = firstDayOfMonth(dateStr);
  let week = document.createElement('tr');
  for (let dayCount = 0; dayCount < firstDay; dayCount++) {
    week.appendChild(document.createElement('td'));
  }
  for (let day = 1; day <= daysInMonth(dateStr); day++) {
    const dayElement = document.createElement('td');
    dayElement.innerText = day;
    week.appendChild(dayElement);

    if (!((day + firstDay) % 7)) {
      monthTableBody.appendChild(week);
      week = document.createElement('tr');
    }
  };
  monthTableBody.appendChild(week);
  return monthTableBody;
};

const generateDaysOfWeekRow = () => {
  const daysOfWeekContent = document.createElement('tr');
  daysOfWeek().forEach((day) => {
    const dayOfWeekContent = document.createElement('th');
    dayOfWeekContent.innerText = day;
    daysOfWeekContent.appendChild(dayOfWeekContent);
  });
  return daysOfWeekContent;
};

const getMonthAndYear = (dateStr) => {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
    .format(getDateFromStr(dateStr));
};

const daysOfWeek = (locale = 'en-US', format = 'short') => {
  const baseDate = new Date(1970, 0, 4);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(baseDate);
    day.setDate(baseDate.getDate() + i);
    return day.toLocaleDateString(locale, { weekday: format });
  });
};

const firstDayOfMonth = (dateStr) => {
  const date = getDateFromStr(dateStr);
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const daysInMonth = (dateStr) => {
  const date = getDateFromStr(dateStr);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

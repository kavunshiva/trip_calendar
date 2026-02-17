export const debounce = (callback, wait) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), wait);
  }
};

export const generateCalendarMonth = ({ name, weeks }) => {
  const monthTable = document.createElement('table');
  const monthAndYearContent = document.createElement('caption');
  const tableMonthBody = generateMonthTableBody(weeks);
  monthAndYearContent.innerText = name;
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

const generateMonthTableBody = (weeks) => {
  const monthTableBody = document.createElement('tbody');
  weeks.forEach((week) => {
    const weekElement = document.createElement('tr');
    week.forEach(({ day, color }) => {
      const dayElement = document.createElement('td');
      if (day) dayElement.innerText = day;
      if (color) dayElement.style.backgroundColor = color;
      weekElement.appendChild(dayElement);
    });
    monthTableBody.appendChild(weekElement);
  })
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

const daysOfWeek = (locale = 'en-US', format = 'short') => {
  const baseDate = new Date(1970, 0, 4);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(baseDate);
    day.setDate(baseDate.getDate() + i);
    return day.toLocaleDateString(locale, { weekday: format });
  });
};

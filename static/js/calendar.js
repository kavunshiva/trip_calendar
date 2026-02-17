import { debounce, generateCalendarMonth, getRandomHexColor, getDateFromStr, getDateElementFromCalendarMonth } from './utils.js';

const fetchStaysOnCalendar = async (dateStr) => {
  const calendarMonthsElement = document.getElementById('calendar-months');
  const scheduleFile = document.getElementById('schedule');
  const body = new FormData()
  body.append('startDate', dateStr);
  body.append('schedule', scheduleFile.files[0]);
  const calendarMonths = await fetch('/api/calendar-months', { method: 'post', body });

  calendarMonthsElement.innerHTML = '';
  let calendarMonth = generateCalendarMonth(dateStr);
  let date = getDateFromStr(dateStr);
  let month = date.getMonth();
  stays.forEach((stay) => {
    const color = getRandomHexColor();
    for (let day = 0; day < stay.duration; day++) {
      date.setDate(date.getDate() + 1);
      if (date.getMonth() !== month) {
        calendarMonthsElement.appendChild(calendarMonth);
        calendarMonth = generateCalendarMonth(date.toISOString().split('T')[0]);
        month = date.getMonth();
      }
      getDateElementFromCalendarMonth(calendarMonth, date).style.backgroundColor = color;
    }
  });
  calendarMonthsElement.appendChild(calendarMonth);
};

document.addEventListener('DOMContentLoaded', () => {
  const startDatePicker = document.getElementById('start-date');

  startDatePicker.addEventListener('change', debounce((event) => {
    const { value: dateStr } = event.target;
    fetchStaysOnCalendar(dateStr);
  }, 300));
});

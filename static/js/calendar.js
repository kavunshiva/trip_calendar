import { debounce, generateCalendarMonth } from './utils.js';

const fetchStaysOnCalendar = async (dateStr) => {
  const calendarMonthsElement = document.getElementById('calendar-months');
  const scheduleFile = document.getElementById('schedule');
  const body = new FormData()
  body.append('startDate', dateStr);
  body.append('schedule', scheduleFile.files[0]);
  const calendarMonths = await fetch('/api/calendar-months', { method: 'post', body })
    .then((response) => response.json())
  calendarMonthsElement.innerHTML = '';
  calendarMonths.months.forEach((calendarMonth) => {
    calendarMonthsElement.appendChild(generateCalendarMonth(calendarMonth));
  });
  calendarMonthsElement.appendChild(generateLegend(calendarMonths));
};

const generateLegend = ({ placeColors }) => {
  const legend = document.createElement('table');
  const caption = document.createElement('caption');
  caption.innerText = 'Legend';
  const body = document.createElement('tbody');
  placeColors.forEach(({ place, color }) => {
    const row = document.createElement('tr');
    const column = document.createElement('td');
    column.innerText = place;
    column.style.backgroundColor = color;
    row.appendChild(column);
    body.appendChild(row);
  });
  legend.appendChild(caption);
  legend.appendChild(body);
  return legend;
};

document.addEventListener('DOMContentLoaded', () => {
  const startDatePicker = document.getElementById('start-date');
  const scheduleFile = document.getElementById('schedule');

  startDatePicker.addEventListener('change', debounce((event) => {
    const { value: dateStr } = event.target;
    if (scheduleFile.files.length) fetchStaysOnCalendar(dateStr);
  }, 300));

  scheduleFile.addEventListener('change', () => {
    const { value: dateStr } = startDatePicker;
    if (dateStr) fetchStaysOnCalendar(dateStr);
  });
});

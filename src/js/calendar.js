import { debounce, generateCalendarMonth, getRandomHexColor, getDateFromStr, getDateElementFromCalendarMonth } from './utils.js';

const stays = [
  { place: 'Buenos Aires', duration: 5 },
  { place: 'Montevideo', duration: 5 },
  { place: 'São Paulo', duration: 5 },
  { place: 'Rio de Janeiro', duration: 5 },
  { place: 'La Paz', duration: 5 },
  { place: 'Cusco', duration: 5 },
  { place: 'Cordillera Huayhuash', duration: 10 },
  { place: 'Lima', duration: 5 },
  { place: 'Medellin', duration: 5 },
  { place: 'Cartagena', duration: 5 },
  { place: 'Bogota', duration: 5 },
];

const showStaysOnCalendar = (dateStr) => {
  const calendarMonthsElement = document.getElementById('calendar-months');
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
    showStaysOnCalendar(dateStr);
  }, 300));
});

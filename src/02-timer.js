import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const daysTracker = document.querySelector('[data-days]');
const hoursTracker = document.querySelector('[data-hours]');
const minutesTracker = document.querySelector('[data-minutes]');
const secondsTracker = document.querySelector('[data-seconds]');
let timerId = null;

btnStart.setAttribute('disabled', true);

const addLeadingZero = value => String(value).padStart(2, 0);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.removeAttribute('disabled');

    const showTimer = () => {
      const now = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      if (!selectData) return;

      const dataSet = selectData - now;
      const { days, hours, minutes, seconds } = convertMs(dataSet);
      daysTracker.textContent = days;
      hoursTracker.textContent = addLeadingZero(hours);
      minutesTracker.textContent = addLeadingZero(minutes);
      secondsTracker.textContent = addLeadingZero(seconds);

      if (
        daysTracker.textContent === '0' &&
        hoursTracker.textContent === '00' &&
        minutesTracker.textContent === '00' &&
        secondsTracker.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    };

    const onClick = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      showTimer();
      timerId = setInterval(showTimer, 1000);
    };

    btnStart.addEventListener('click', onClick);
  },
};

flatpickr('#datetime-picker', { ...options });

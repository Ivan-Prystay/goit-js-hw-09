import flatpickr from 'flatpickr';
//import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');
startBtnRef.setAttribute('disabled', '');
const timerRef = document.querySelector('.timer');
timerRef.style.display = 'flex';
const tableRef = timerRef.children;

[...tableRef].forEach(divField => {
  divField.style.display = 'flex';
  divField.style.flexDirection = 'column';
  divField.style.alignItems = 'center';
  divField.style.marginRight = '16px';
});
const labelRefs = document.querySelectorAll('.label');
[...labelRefs].forEach(labelRef => {
  labelRef.style.textTransform = 'uppercase';
  labelRef.style.fontSize = '12px';
});
const valueRefs = document.querySelectorAll('.value');
[...valueRefs].forEach(valueRef => {
  valueRef.style.fontSize = '40px';
});

let timerDeadline = null;
let timeIntervalId = null;
let diff = null;
``;

const configNotyfy = {
  closeButton: true,
  clickToClose: true,
  position: 'center-top',
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: Ukrainian,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      startBtnRef.removeAttribute('disabled', '');
    } else {
      Notify.failure('Please choose a date in the future', configNotyfy);
      startBtnRef.setAttribute('disabled', '');
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

startBtnRef.addEventListener('click', () => {
  startBtnRef.setAttribute('disabled', '');
  inputRef.setAttribute('disabled', '');
  timerDeadline = fp.selectedDates[0];
  timeIntervalId = setInterval(startTimer, 1000);
  Notify.success('TIMER START!!!', configNotyfy);
});

function startTimer() {
  diff = fp.selectedDates[0] - Date.now();
  //
  const data = convertMs(diff);

  document.querySelector('[data-seconds]').textContent = addLeadinZero(
    data.seconds
  );
  document.querySelector('[data-minutes]').textContent = addLeadinZero(
    data.minutes
  );
  document.querySelector('[data-hours]').textContent = addLeadinZero(
    data.hours
  );
  document.querySelector('[data-days]').textContent = addLeadinZero(data.days);
  if (diff <= 0) {
    clearInterval(timeIntervalId);
    inputRef.removeAttribute('disabled', '');
    Notify.info('TIMER STOP!!!', configNotyfy);
    [...valueRefs].forEach(valueRef => {
      valueRef.textContent = '00';
    });
  }
}

function addLeadinZero(value) {
  return String(value).padStart(2, '0');
}

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

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
let id = null;

const reff = {
  btnStart: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  dataInput: document.querySelector('#datetime-picker'),
};

function btnDisable(btn, onOf) {
  btn.disabled = onOf;
}
btnDisable(reff.btnStart, true);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
    clearInterval(id);
    reff.dataDays.textContent = '00';
    reff.dataHours.textContent = '00';
    reff.dataMinutes.textContent = '00';
    reff.dataSeconds.textContent = '00';
  },
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      return Notify.failure('Please choose a date in the future');
    } else {
      btnDisable(reff.btnStart, false);
      btnDisable(reff.dataInput, true);

      Notify.success('Date is correct!');
    }
  },
};

const flatPickr = flatpickr(input, options);

function recordingData() {
  const time = flatPickr.selectedDates[0].getTime() - Date.now();
  if (time < 1000) {
    btnDisable(reff.dataInput, false);
    clearInterval(id);
  }

  reff.dataDays.textContent = addLeadingZero(convertMs(time).days);
  reff.dataHours.textContent = addLeadingZero(convertMs(time).hours);
  reff.dataMinutes.textContent = addLeadingZero(convertMs(time).minutes);
  reff.dataSeconds.textContent = addLeadingZero(convertMs(time).seconds);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onTimerStart() {
  btnDisable(reff.btnStart, true);
  id = setInterval(recordingData, 1000);
}
reff.btnStart.addEventListener('click', onTimerStart);
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

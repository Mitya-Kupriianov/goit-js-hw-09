import { Notify } from 'notiflix/build/notiflix-notify-aio';

const reff = {
  delays: document.querySelector('[name="delay"]'),
  amount: document.querySelector('[name="amount"]'),
  step: document.querySelector('[name="step"]'),
  btn: document.querySelector('.form'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
function start(e) {
  e.preventDefault();

  let a = Number(reff.delays.value);
  const b = Number(reff.step.value);
  for (let i = 0; i < reff.amount.value; i++) {
    createPromise(i, a)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    a += b;
  }
}

reff.btn.addEventListener('submit', start);

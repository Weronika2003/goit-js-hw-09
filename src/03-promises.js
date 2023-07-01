import { Notify } from 'notiflix/build/notiflix-notify-aio';

const modifyForm = document.querySelector('form')

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }, delay)
  });
};

function usePromise(e) {
  e.preventDefault();
  let changeDelay = Number(e.target.delay.value);
  let changeAmount = Number(e.target.amount.value);
  let changeStep = Number(e.target.step.value);

  for (let i = 0; i < changeAmount; i += 1) {
    createPromise(i + 1, changeDelay)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    changeDelay += changeStep;
  }
} 
modifyForm.addEventListener('submit', usePromise);
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
console.log('formRef: ', formRef);
console.log(2 + 2);

formRef.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  if (+delay.value < 0 || +step.value < 0 || +amount.value < 0) {
    return Notify.failure('Please enter non-negative numbers');
  }

  const startDelay = +delay.value;
  for (let i = 0; i < +amount.value; i += 1) {
    const delay = startDelay + +step.value * i;
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

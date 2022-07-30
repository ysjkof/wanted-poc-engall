import { Time } from '../pages/main';

// @ts-ignore
export const getTime = (time: Time) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const suffix = +hours < 12 ? 'AM' : 'PM';
  return `${trans2Digit(hours)}:${trans2Digit(minutes)} ${suffix}`;
};

export const trans2Digit = (number: number) => (number + '').padStart(2, '0');

export const makeHours = () => {
  const hours: number[] = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  return hours;
};
export const makeMinutes = () => {
  const hours: number[] = [];
  for (let i = 0; i < 60; i = i + 5) {
    hours.push(i);
  }
  return hours;
};

export const getTotalMinute = (date: Date) =>
  date.getHours() * 60 + date.getMinutes();

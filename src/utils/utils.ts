import { Time } from "../pages/main";

// @ts-ignore
export const splitTime = (time: Time): [string, string] => time.split(":");

export const getTime = (time: Time) => {
  const [hours, minutes] = time.split(":");
  const suffix = +hours < 12 ? "AM" : "PM";
  return `${hours}:${minutes} ${suffix}`;
};

export const trans2Digit = (number: number) => (number + "").padStart(2, "0");

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

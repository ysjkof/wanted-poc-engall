import { useEffect, useState } from 'react';
import { DAYS_KOR } from '../constants/constants';
import schedulesModel, {
  Schedule,
  ScheduleInput,
} from '../models/schedulesModel';
import { getTime, getTotalMinute, trans2Digit } from '../utils/utils';

export default function useScheduls() {
  const [data, setData] = useState<Schedule[]>([]);

  const getSchedules = async () => {
    const schedulesData = await schedulesModel.getAll();
    setData(schedulesData);
  };

  const saveSchedules = async (inputData: ScheduleInput[]) => {
    console.log('data', data);

    const getMessages = (data: Schedule[]) =>
      data.map(
        (value) =>
          `${DAYS_KOR[value.startDate.getDay()]}(${getTime(value.startDate)})`
      );

    const filterd = data.filter((value) => {
      const existTime = getTotalMinute(value.startDate);
      const existDay = value.startDate.getDay();
      return inputData.find(
        (input) =>
          existTime === getTotalMinute(input.startDate) &&
          existDay === input.startDate.getDay()
      );
    });

    console.log('filterd', filterd);
    if (filterd.length >= 1) {
      alert(
        `${getMessages(filterd)
          .map((message) => message)
          .join(', ')}
        위 일정은 이미 있는 일정입니다. 제외하고 선택하세요
          `
      );
      return;
    }

    const result = await Promise.all(
      inputData.map(async (dates) => await schedulesModel.save(dates))
    );
    setData((prevData) => [...prevData, ...result]);
    return result;
  };

  const deleteScheduleById = async (id: number) => {
    const result = await schedulesModel.deleteById(id);
    setData((prevData) => [...prevData.filter((data) => data.id !== id)]);
    return result;
  };

  useEffect(() => {
    getSchedules();
  }, []);

  return { data, saveSchedules, deleteScheduleById };
}

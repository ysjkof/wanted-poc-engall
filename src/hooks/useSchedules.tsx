import { useEffect, useState } from 'react';
import { DAYS_KOR } from '../constants/constants';
import schedulesModel, {
  Schedule,
  ScheduleInput,
} from '../models/schedulesModel';
import { checkTimeOverlap, getTime, getTotalMinute } from '../utils/utils';

export default function useScheduls() {
  const [data, setData] = useState<Schedule[]>([]);

  const getSchedules = async () => {
    const schedulesData = await schedulesModel.getAll();
    setData(schedulesData);
  };

  const saveSchedules = async (inputData: ScheduleInput[]) => {
    const getMessages = (schedules: Schedule[]) =>
      schedules.map(
        (value) =>
          `${DAYS_KOR[value.startDate.getDay()]}(${getTime(
            value.startDate
          )} ~ ${getTime(value.endDate)})`
      );

    const filterTimeOverlap = (schedules: Schedule[]) => {
      return schedules.filter((value) => {
        return inputData.find(
          (input) =>
            checkTimeOverlap({
              existStartTime: getTotalMinute(value.startDate),
              existEndTime: getTotalMinute(value.endDate),
              newStartTime: getTotalMinute(input.startDate),
              newEndTime: getTotalMinute(input.endDate),
            }) &&
            value.startDate.getDay() === input.startDate.getDay() &&
            input
        );
      });
    };

    const filteredTimeOverlap = filterTimeOverlap(data);
    if (filteredTimeOverlap.length >= 1) {
      alert(
        `${getMessages(filteredTimeOverlap)
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

import { useEffect, useState } from 'react';
import schedulesModel, { Schedule } from '../models/schedulesModel';

export default function useScheduls() {
  const [data, setData] = useState<Schedule[]>([]);

  const getSchedules = async () => {
    const schedulesData = await schedulesModel.getAll();
    setData(schedulesData);
  };

  const saveSchedules = async (data: Date[]) => {
    const result = await Promise.all(
      data.map(async (data) => await schedulesModel.save({ startTime: data }))
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

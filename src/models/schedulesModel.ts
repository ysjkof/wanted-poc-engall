import axiosInstance from '../api/axiosInstance';
import HttpRequest from '../api/httpRequest';
import { Days } from '../pages/main';

export type DayTypes = Days;

export interface Schedule {
  id: number;
  startTime: Date;
}
export interface ScheduleInput extends Pick<Schedule, 'startTime'> {}

class SchedulesModel {
  constructor(private readonly request: HttpRequest<Schedule>) {
    this.request;
  }

  async getAll() {
    const data = await this.request.get();
    return data.map((data) => ({
      ...data,
      startTime: new Date(data.startTime),
    }));
  }

  save(data: ScheduleInput) {
    return this.request.post(data);
  }

  deleteById(id: number) {
    return this.request.delete(id);
  }
}

const scheduleRequest = new HttpRequest<Schedule>(axiosInstance);

export default new SchedulesModel(scheduleRequest);

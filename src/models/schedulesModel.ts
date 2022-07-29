import axiosInstance from '../api/axiosInstance';
import HttpRequest from '../api/httpRequest';
import { Days } from '../constants/constants';

export type DayTypes = Days;

export interface Schedule {
  id: number;
  startDate: Date;
  endDate: Date;
}
export interface ScheduleInput
  extends Pick<Schedule, 'startDate' | 'endDate'> {}

class SchedulesModel {
  constructor(private readonly request: HttpRequest<Schedule>) {
    this.request;
  }

  async getAll() {
    const data = await this.request.get();
    return data.map((data) => ({
      id: data.id,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
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

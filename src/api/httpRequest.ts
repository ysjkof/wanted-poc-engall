import { AxiosInstance } from 'axios';
import { ScheduleInput } from '../models/schedulesModel';

class HttpRequest<T> {
  constructor(private readonly service: AxiosInstance) {
    this.service;
  }

  get() {
    return this.service.get<T[]>('').then((response) => response.data);
  }

  delete(id: number) {
    return this.service.delete(id + '').then((response) => ({ ok: true }));
  }

  post(data: ScheduleInput) {
    return this.service.post<T>('', data).then((response) => response.data);
  }
}

export default HttpRequest;

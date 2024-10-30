import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../api/Scheduling';

@Injectable()
export class SchedulingService {

    constructor(private http: HttpClient) { }

    async getNotification(): Promise<Agendamento[]> {
        const res = await this.http.get<any>('assets/template/data/agendamentos.json').toPromise();
        return res.data as Agendamento[];
    }
}

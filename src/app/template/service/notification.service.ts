import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notificacao } from '../api/Notification';

@Injectable()
export class NotificationService {

    constructor(private http: HttpClient) { }

    async getNotification(): Promise<Notificacao[]> {
        const res = await this.http.get<any>('assets/template/data/notificacoes.json').toPromise();
        return res.data as Notificacao[];
    }
}

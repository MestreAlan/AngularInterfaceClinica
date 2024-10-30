import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Procedimento } from '../api/Procedimentos';

@Injectable()
export class ProcedureService {

    constructor(private http: HttpClient) { }

    getProcedimentos(): Promise<Procedimento[]> {
        return this.http.get<any>('assets/template/data/procedimentos.json')
            .toPromise()
            .then(res => res.data as Procedimento[]);
    }
}

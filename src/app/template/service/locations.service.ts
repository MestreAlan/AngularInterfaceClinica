import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LocationsService {

    constructor(private http: HttpClient) { }

    getCountries(): Observable<any[]> {
        return this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/paises');
    }

    getStates(): Observable<any[]> {
        return this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    }

    getCities(stateId?: number): Observable<any[]> {
        if (stateId) {
            return this.http.get<any[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`);
        } else {
            return this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
        }
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clinica, ProfissionalList } from '../api/Clinicas';

@Injectable()
export class ClinicasService {

    constructor(private http: HttpClient) { }

    getClinicas() {
        return this.http.get<any>('assets/template/data/clinicas.json')
            .toPromise()
            .then(res => res.data as Clinica[])
            .then(data => data);
    }

    async getProfissionaisInfo(): Promise<ProfissionalList[]> {
        const clinicas = await this.getClinicas();
        const profissionaisInfo: ProfissionalList[] = [];

        clinicas.forEach(clinica => {
            clinica.especialidades?.forEach(especialidade => {
                const index = profissionaisInfo.findIndex(info => info.especialidade.some(e => e.nome === especialidade.nome && e.profissional === especialidade.profissional));
                if (index === -1) {
                    profissionaisInfo.push({
                        especialidade: [especialidade],
                        clinica: [clinica],
                        filtroGlobal: `${especialidade.nome} ${especialidade.profissional} ${especialidade.plano_de_saude} ${especialidade.valor_da_consulta} ${clinica.nome}`
                    });
                } else {
                    profissionaisInfo[index].especialidade.push(especialidade);
                    profissionaisInfo[index].clinica.push(clinica);
                    const filtroAtual = `${especialidade.nome} ${especialidade.profissional} ${especialidade.plano_de_saude} ${especialidade.valor_da_consulta} ${clinica.nome}`;
                    profissionaisInfo[index].filtroGlobal = filtroAtual;
                }
            });
        });

        return profissionaisInfo;
    }
}

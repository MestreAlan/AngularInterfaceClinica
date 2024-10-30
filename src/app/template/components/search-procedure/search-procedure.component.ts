import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProcedureService } from 'src/app/template/service/procedure.service';
import { Clinicas, Procedimento } from 'src/app/template/api/Procedimentos';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    templateUrl: './search-procedure.component.html',
    providers: [PrimeNGConfig]
})
export class SearchProcedureComponent implements OnInit {

    procedimentos: Procedimento[] = [];

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private procedureService: ProcedureService,
        private config: PrimeNGConfig
    ) { }

    ngOnInit() {
        this.loadData();
        this.configTranslations();
    }

    loadData() {
        this.procedureService.getProcedimentos().then(procedimentos => {
            this.procedimentos = procedimentos.map(procedimento => ({
                ...procedimento,
                filtroGlobal: `${procedimento.codigo} ${procedimento.nome} ${procedimento.preco} ${this.getNomeClinica(procedimento.clinicas)} ${this.getContatos(procedimento.clinicas)}`,
                nomeClinicaFormatado: this.getNomeClinica(procedimento.clinicas),
                contatoFormatado: this.getContatos(procedimento.clinicas)
            }));
            this.loading = false;
        });
    }

    configTranslations() {
        this.config.setTranslation({
            matchAny: 'Corresponder a qualquer',
            emptyMessage: 'Nenhum resultado encontrado',
            apply: 'Aplicar',
            clear: 'Limpar',
            matchAll: 'Corresponder a todos',
            addRule: 'Adicionar regra',
            removeRule: 'Remover regra',
            choose: 'Escolher',
            dateIs: 'Data é',
            dateIsNot: 'Data não é',
            dateBefore: 'Data anterior a',
            dateAfter: 'Data posterior a',
            startsWith: 'Começa com',
            contains: 'Contém',
            notContains: 'Não contém',
            endsWith: 'Termina com',
            equals: 'Igual',
            notEquals: 'Diferente',
            noFilter: 'Sem filtro',
            lt: 'Menor que',
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getContatos(clinicas: Clinicas[]): string {
        if (!clinicas || clinicas.length === 0) return '';

        const contatos: string[] = [];
        clinicas.forEach(clinica => {
            if (clinica.contatos) {
                for (const contato of clinica.contatos) {
                    if (contato.telefone) {
                        contatos.push(contato.telefone);
                    }
                }
            }
        });
        if (contatos.length === 0) return '';
        return contatos.join('<br>');
    }

    getNomeClinica(clinicas: Clinicas[]): string {
        if (!clinicas || clinicas.length === 0) return '';

        const Clinica = clinicas[0];
        if (Clinica && Clinica.nome) {
            return Clinica.nome;
        } else {
            return '';
        }
    }

}

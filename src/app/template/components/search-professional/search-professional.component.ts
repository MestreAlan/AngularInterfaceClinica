import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Clinica, Contato, Endereco, ProfissionalList, PlanoSaude } from 'src/app/template/api/Clinicas';
import { ClinicasService } from 'src/app/template/service/clinicas.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, PrimeNGConfig } from 'primeng/api';

@Component({
    templateUrl: './search-professional.component.html',
    providers: [MessageService, ConfirmationService]
})

export class SearchProfessionalComponent implements OnInit {

    clinicas: Clinica[] = [];

    profissionais: ProfissionalList[] = [];

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private clinicasService: ClinicasService, private config: PrimeNGConfig) { }

    ngOnInit() {
        this.clinicasService.getClinicas().then(clinicas => {
            this.clinicas = clinicas.map(clinica => ({
                ...clinica,
                filtroGlobal: `${clinica.nome} ${this.getEndereco(clinica.endereco)} ${clinica.atendimento_inicio} ${clinica.atendimento_fim} ${this.getContatos(clinica.contatos)}`,
                enderecoFormatado: this.getEndereco(clinica.endereco),
                contatosFormatado: this.getContatos(clinica.contatos)
            }));
            this.loading = false;
        });

        this.clinicasService.getProfissionaisInfo().then(profissionais => {
            this.profissionais = profissionais.map(profissional => {
                const especialidade = profissional.especialidade[0];
                const clinica = profissional.clinica[0];

                const profissionalFilter = especialidade ? `${especialidade.profissional || ''}` : '';
                const especialidadeFilter = especialidade ? `${especialidade.nome || ''}` : '';
                const clinicaFilter = clinica ? `${clinica.nome || ''}` : '';
                const planoSaudeFilter = this.getPlanosDeSaude(especialidade?.plano_de_saude) || '';
                const valorConsultaFilter = especialidade ? `${especialidade.valor_da_consulta || ''}` : '';

                const filtroGlobal = `${profissionalFilter} ${especialidadeFilter} ${clinicaFilter} ${planoSaudeFilter} ${valorConsultaFilter}`;

                return {
                    especialidade: profissional.especialidade.map(especialidade => ({
                        nome: especialidade.nome,
                        profissional: especialidade.profissional,
                        plano_de_saude: especialidade.plano_de_saude || [],
                        valor_da_consulta: especialidade.valor_da_consulta || ''
                    })),
                    clinica: profissional.clinica || [],
                    filtroGlobal: filtroGlobal,
                    profissionalFormatado: profissionalFilter,
                    especialidadeFormatado: especialidadeFilter,
                    clinicaFormatado: clinicaFilter,
                    planoDeSaudeFormatado: planoSaudeFilter,
                    valorConsultaFormatado: valorConsultaFilter,
                };
            });
        });

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

    getEnderecoLink(endereco: Endereco[]): string {
        if (!endereco) return '';

        const cep = endereco.map(endereco => endereco.cep || '');
        const logradouro = endereco.map(endereco => endereco.logradouro || '');
        const numero = endereco.map(endereco => endereco.numero || '');
        const bairro = endereco.map(endereco => endereco.bairro || '');
        const cidade = endereco.map(endereco => endereco.cidade || '');
        const estado = endereco.map(endereco => endereco.estado || '');

        const enderecoStr = `${logradouro}, ${numero} - ${bairro}, ${cidade} - ${estado}, ${cep}`;
        return `https://www.google.com/maps/place/${encodeURIComponent(enderecoStr)}`;
    }

    getEndereco(endereco: Endereco[]): string {
        if (!endereco) return '';

        const cep = endereco.map(endereco => endereco.cep || '');
        const logradouro = endereco.map(endereco => endereco.logradouro || '');
        const numero = endereco.map(endereco => endereco.numero || '');
        const bairro = endereco.map(endereco => endereco.bairro || '');
        const cidade = endereco.map(endereco => endereco.cidade || '');
        const estado = endereco.map(endereco => endereco.estado || '');

        const enderecoStr = `${logradouro}, ${numero} - ${bairro}, ${cidade} - ${estado}, ${cep}`;
        return `${enderecoStr}`;
    }

    getContatos(contatos: Contato[]): string {
        if (!contatos || contatos.length === 0) return '';

        return contatos.map(contato => contato.telefone || '').join('<br>');
    }

    getPlanosDeSaude(planoDeSaude: PlanoSaude[] | undefined): string {
        if (!planoDeSaude || planoDeSaude.length === 0) return '';

        return planoDeSaude.map(plano => plano.nome || '').join('<br>');
    }


}

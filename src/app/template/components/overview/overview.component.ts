import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Notificacao } from '../../api/Notification';
import { NotificationService } from '../../service/notification.service';
import { Agendamento } from '../../api/Scheduling';
import { SchedulingService } from '../../service/scheduling.service';

@Component({
    templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit, OnDestroy {
    items!: MenuItem[];
    notificacoes!: { [date: string]: Notificacao[] }; // Alterado para ser agrupado

    agendamentosEmAberto!: Agendamento[];
    historicoAgendamentos!: Agendamento[];


    notificacaoConfig = {
        Financeiro: {
            icon: 'pi pi-dollar'
        },
        Clinico: {
            icon: 'pi pi-chart-pie'
        },
        Agendamento: {
            icon: 'pi pi-calendar'
        },
        Geral: {
            icon: 'pi pi-info-circle'
        },
        Recorrencia: {
            icon: 'pi pi-refresh'
        },
        Seguranca: {
            icon: 'pi pi-shield'
        },
        Sistema: {
            icon: 'pi pi-cog'
        }
    };

    constructor(
        private notificationService: NotificationService,
        private schedulingService: SchedulingService
    ) { }

    ngOnInit() {

        // Carregar notificações e agrupar por data
        this.notificationService.getNotification().then(data => {
            this.notificacoes = this.groupNotificacoesPorData(data);
        });

        // Definição dos itens do menu
        this.items = [
            { label: 'Atualizar', icon: 'pi pi-fw pi-replay' },
            { label: 'Visto', icon: 'pi pi-fw pi-check' }
        ];

        // Carregar agendamentos
        this.schedulingService.getNotification().then(data => {
            console.log(data);
            // Filtrar agendamentos em aberto
            this.agendamentosEmAberto = data.filter(agendamento =>
                agendamento.status === 'Em aberto' ||
                agendamento.status === 'Falta'
            );

            // Filtrar histórico de agendamentos
            this.historicoAgendamentos = data.filter(agendamento =>
                agendamento.status === 'Concluído' ||
                agendamento.status === 'Cancelado pelo paciente' ||
                agendamento.status === 'Cancelado pela clínica'
            );
        });

    }

    ngOnDestroy() {
        // Limpeza de recursos, se necessário
    }

    sortDataGroups = (a: { key: string, value: Notificacao[] }, b: { key: string, value: Notificacao[] }): number => {
        const dateA = new Date(a.key.split('/').reverse().join('-')).getTime();
        const dateB = new Date(b.key.split('/').reverse().join('-')).getTime();
        return dateB - dateA; // Ordenar de forma decrescente
    };

    groupNotificacoesPorData(notificacoes: Notificacao[]): { [date: string]: Notificacao[] } {
        // Ordenar as notificações por data em ordem decrescente (do mais recente ao mais antigo)
        notificacoes.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
        //notificacoes.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

        // Criar um objeto para agrupar as notificações por data
        const groupedNotificacoes: { [date: string]: Notificacao[] } = {};
        var teste = 0;
        notificacoes.forEach(notificacao => {
            // Converter a data para uma string para usar como chave do agrupamento
            const dateKey = new Date(notificacao.data).toLocaleDateString('pt-BR');
            teste++;
            // Se a data não existe como chave, crie uma nova chave com uma lista vazia
            if (!groupedNotificacoes[dateKey]) {
                groupedNotificacoes[dateKey] = [];
            }

            // Adicionar a notificação à lista correspondente à data
            groupedNotificacoes[dateKey].push(notificacao);
        });

        // Retornar o objeto agrupado com as notificações agrupadas por data
        return groupedNotificacoes;
    }
}

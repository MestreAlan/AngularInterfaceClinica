import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Geral',
                items: [
                    { label: 'Visão geral', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Clínicas',
                items: [
                    {
                        label: 'Buscar', icon: 'pi pi-search pi-bookmark',
                        items: [
                            { label: 'Profissionais, convênios e especialidades', icon: 'pi pi-fw pi-bookmark', routerLink: ['/search-professional'] },
                            { label: 'Procedimentos', icon: 'pi pi-fw pi-bookmark', routerLink: ['/search-procedure'] },
                            { label: 'Clinicas', icon: 'pi pi-fw pi-bookmark', routerLink: ['/search-clinics'] },
                        ]
                    },
                    {
                        label: 'Agendamentos', icon: 'pi pi-search pi-bookmark',
                        items: [
                            { label: 'Novo agendamento', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/table'] },
                            { label: 'Retornos', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/table'] },
                            { label: 'Concluídos', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/table'] },
                        ]
                    }
                ]
            },
            {
                label: 'Usuário',
                items: [
                    { label: 'Dados do usuário', icon: 'pi pi-fw pi-id-card', routerLink: ['/personal-data'] }
                ]
            },
            {
                label: 'Anamnese',
                items: [
                    { label: 'Como está sua saúde?', icon: 'pi pi-fw pi-eye', routerLink: ['/uikit/input'], badge: 'NEW' }
                ]
            },
            {
                label: 'Outros',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Financeiro',
                        icon: 'pi pi-fw pi-money-bill',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            }
                        ]
                    }
                ]
            }
        ];
    }
}

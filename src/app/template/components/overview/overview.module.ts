import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverviewComponent } from './overview.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { OverviewRoutingModule } from './overview-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { SplitterModule } from 'primeng/splitter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        ButtonModule,
        OverviewRoutingModule,
        TabViewModule,
        SplitterModule
    ],
    declarations: [OverviewComponent]
})
export class OverviewModule { }

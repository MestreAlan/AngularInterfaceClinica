import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './template/components/notfound/notfound.component';
import { ProductService } from './template/service/product.service';
import { CountryService } from './template/service/country.service';
import { CustomerService } from './template/service/customer.service';
import { EventService } from './template/service/event.service';
import { IconService } from './template/service/icon.service';
import { NodeService } from './template/service/node.service';
import { PhotoService } from './template/service/photo.service';
import { ClinicasService } from './template/service/clinicas.service';
import { ProcedureService } from './template/service/procedure.service';
import { NotificationService } from './template/service/notification.service';
import { SchedulingService } from './template/service/scheduling.service';
import { LocationsService } from './template/service/locations.service';
import { AddressService } from './template/service/address.service';


@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, ClinicasService, ProcedureService,
        NotificationService, SchedulingService, LocationsService,
        AddressService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

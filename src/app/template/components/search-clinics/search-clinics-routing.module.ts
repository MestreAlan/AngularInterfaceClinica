import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchClinicsComponent } from './search-clinics.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SearchClinicsComponent }
    ])],
    exports: [RouterModule]
})
export class SearchClinicsRoutingModule { }

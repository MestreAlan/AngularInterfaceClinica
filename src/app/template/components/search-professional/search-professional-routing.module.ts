import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchProfessionalComponent } from './search-professional.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SearchProfessionalComponent }
    ])],
    exports: [RouterModule]
})
export class SearchProfessionalRoutingModule { }

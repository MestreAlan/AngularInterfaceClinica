import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchProcedureComponent } from './search-procedure.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SearchProcedureComponent }
    ])],
    exports: [RouterModule]
})
export class SearchProcedureRoutingModule { }

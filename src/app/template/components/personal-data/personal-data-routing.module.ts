import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonalDataComponent } from './personal-data.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PersonalDataComponent }
    ])],
    exports: [RouterModule]
})
export class PersonalDataRoutingModule { }

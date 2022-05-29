import { RequestComponent } from './request/request.component';
import { SealinksComponent } from './sealinks/sealinks.component';
import { CounterpartyComponent } from './counterparty/counterparty.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', redirectTo:'complaince', pathMatch:'full'},
  { path:'counterparty', component:CounterpartyComponent},
  { path: 'sealinks',component:SealinksComponent},
  { path:'request',component:RequestComponent}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplainceRoutingModule { }

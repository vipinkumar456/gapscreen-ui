import { ComplainceRoutingModule } from './complaince.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterpartyComponent } from './counterparty/counterparty.component';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import { SealinksComponent } from './sealinks/sealinks.component';
import { QuestionModalComponent } from './question-modal/question-modal.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { RequestComponent } from './request/request.component';





@NgModule({
  declarations: [
    CounterpartyComponent,
    SealinksComponent,
    QuestionModalComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    ComplainceRoutingModule,
    DropdownModule,
    TabViewModule,
    InputTextareaModule
  ]
})
export class ComplainceModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
@NgModule({
    declarations: [
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule
    ], exports: [
        FormsModule,
        ReactiveFormsModule
    ],
    providers:[MessageService]
})
export class ReuseModule { }
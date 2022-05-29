import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ErrorsComponent } from 'src/app/shared/errors/errors.component';
import { NgbDateCustomParserFormatter } from '../services/dateformat.service';
import { HttpService } from '../services/http.service';
import { AppInterceptor } from '../services/interceptor';

const IMP_EXP = [ReactiveFormsModule, HttpClientModule];

@NgModule({
  declarations: [ErrorsComponent],
  imports: [CommonModule],
  exports: [...IMP_EXP, ErrorsComponent, CommonModule],
  providers: [
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
  ],
})
export class SharedModule {}

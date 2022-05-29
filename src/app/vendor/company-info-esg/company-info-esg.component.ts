import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PATH } from 'src/app/app.constant';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'company-info-esg',
  templateUrl: './company-info-esg.component.html',
  styleUrls: ['./company-info-esg.component.scss'],
})
export class CompanyInfoEsgComponent implements OnInit {
  @Output("getCompanyInfo") callParent: EventEmitter<any> = new EventEmitter();

  esg: Array<any> = [];
  subsriptions: Subscription;
  user: any;
  companyInfo: any = {};
  disableBtn:boolean= false;
  questionForm: FormGroup;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private appCookieService: AppCookieService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.appCookieService.get('digiUser'));
    this.getEsg();
  }

  getEsg() {
    this.httpService.getData(PATH.VENDOR_ESG).subscribe((res: Array<any>) => {
        this.esg = [];
        res.forEach((question) => {
          if (question.question) {
            this.esg.push({ question: question.question, answer: '' });
          }
        });
        this.getCompanyInfo();
        this.spinnerService.hide();
      });
  }

  // ngOnDestroy() {
  //   this.subsriptions.unsubscribe();
  // }

  getCompanyInfo() {
    this.spinnerService.show();
    this.httpService.getData(PATH.COMPANY_INFORMATION).subscribe((res: any) => {
          if (!res) {
            this.spinnerService.hide();
            return;
          }

          this.spinnerService.hide();
          this.companyInfo = res;
          if(this.companyInfo.status == 'Submitted'){
             this.disableBtn = true;
          }

          if(this.companyInfo['esg'])
          {
            this.esg = this.companyInfo['esg'];
          }
          // this.questions.map((o) => {
          //   o.answer = this.companyInfo['answers']
          //     ? this.companyInfo['answers'][o.question]
          //     : '';
          // });
        },
        (error) => {
          this.spinnerService.hide();
          
          // this.toastrService.error(error.message?.error);
        }
      );
  }
  onSubmit(form: FormGroup) {
    // let answers=form.value;
    let esg = [];
    this.esg.forEach((q) => {
      let answer = {
        "answer": q.answer,
        "question": q.question
      }
      esg.push(answer)
      // answers[q.question] = q.answer;
    });
    form.markAllAsTouched();
    this.companyInfo['esg'] = esg;
    this.updateCompanyInfo();
  }


  updateCompanyInfo() {
    this.spinnerService.show();
    let branches = [];
    if (this.companyInfo.branchInOtherCountry) {
      this.companyInfo.branchInOtherCountry.map((o) => {
        o.branch ? branches.push(o.branch) : branches.push(o);
      });
      this.companyInfo.branchInOtherCountry = branches;
    }
    // this.companyInfo.step = 4;
    if (this.companyInfo.step <= 5) {
      this.companyInfo.step = 5;
    }
    this.httpService.updateData(PATH.COMPANY_INFORMATION,this.companyInfo).subscribe(
        (res) => {
          this.companyInfo = res;
          this.spinnerService.hide();
          this.router.navigate(['/vendor/vendor-info/5']);
          this.callParent.emit({step:4,url:'/vendor/vendor-info/5'})

        },
        (error) => {
          this.spinnerService.hide();
          
          this.toastrService.error(error.message?.error);
        }
      );
  }


  goNext(){
    this.router.navigate(['vendor/vendor-info/5']);
    this.callParent.emit({
      step: this.companyInfo.step,
      url: '/vendor/vendor-info/5',
    });
  }



  back(){
    this.router.navigate(['/vendor/vendor-info/3'])
    this.callParent.emit({step:this.companyInfo.step,url:'/vendor/vendor-info/3'})
  }
}

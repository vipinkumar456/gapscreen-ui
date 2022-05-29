import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { ActivitiesComponent } from '../activities/activities.component';
import { CompanyInformationFormComponent } from '../company-information-form/company-information-form.component';
import { CompanyInfoQuestionnaireComponent } from '../company-info-questionnaire/company-info-questionnaire.component';
import { CompanyInfoRegulationsComponent } from '../company-info-regulations/company-info-regulations.component';
import { UploadDocumentsComponent } from '../upload-documents/upload-documents.component';
import { HttpService } from 'src/app/services/http.service';
import { PATH } from 'src/app/app.constant';
import { ToastrService } from 'ngx-toastr';
import { AppCookieService } from 'src/app/services/cookieService';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfoEsgComponent } from '../company-info-esg/company-info-esg.component';

@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.scss'],
})
export class VendorRegistrationComponent implements OnInit {
  private stepper: Stepper;
  step = 1;
  percent = this.step * 16.66;
  notes;
  responseRFI: Array<any> = [];
  notesRes: Array<any> = [];
  RfiShow:boolean= false;
  @ViewChild(UploadDocumentsComponent) upload: UploadDocumentsComponent;
  @ViewChild(CompanyInformationFormComponent) companyInfo: CompanyInformationFormComponent;
  @ViewChild(ActivitiesComponent) activities: ActivitiesComponent;
  @ViewChild(CompanyInfoQuestionnaireComponent) questions: CompanyInfoQuestionnaireComponent;
  @ViewChild(CompanyInfoEsgComponent) esg: CompanyInfoEsgComponent;
  @ViewChild(CompanyInfoRegulationsComponent) regulations: CompanyInfoRegulationsComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private appCookieService: AppCookieService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    var stepper = document.querySelector('.stepper');
    this.stepper = new Stepper(stepper, {
      linear: true,
      animation: true,
    });
    this.route.params.subscribe((params) => {
      if (params.step) {
        if (params.step >= 6) {
          this.router.navigate(['/vendor/dashboard']);
        } else {
          this.stepper.to(params.step);
        }
      }
    });
    this.getDefaultCompanyInfo();
    this.getNotes();
  }
  stepperMove(data) {
    if (data.step == 1) {
      this.stepper.to(1);
      this.companyInfo.getCompanyInfo();
      this.activities.getActivities();
    } else if (data.step == 2) {
      this.stepper.to(2);
      this.upload.getCompanyInfo();
      this.activities.getActivities();
    } else if (data.step == 3) {
      this.stepper.to(3);
      this.questions.getCompanyInfo();
      this.activities.getActivities();
    } else if (data.step == 4) {
      this.stepper.to(4);
      this.questions.getCompanyInfo();
      this.activities.getActivities();
    }else {
      this.stepper.to(5);
      this.regulations.getCompanyInfo();
      this.activities.getActivities();
    }
  }
  getCompanyInfo(data) {
    this.stepperMove(data);
    this.activities.getActivities();
    this.step = data.step;
    this.percent = (this.step ? this.step : 1) * 16.66;
  }

  getDefaultCompanyInfo() {
    let user = JSON.parse(this.appCookieService.get('digiUser'));
    this.spinnerService.show();
    this.httpService.getData(PATH.COMPANY_INFORMATION).subscribe((res: any) => {
          this.spinnerService.hide();
          if(res.status == 'Rfi Generated'){
            this.RfiShow= true;
          }
          this.getRFI(res.id);
          this.step = res.step;
          this.percent = (this.step ? this.step : 1) * 16.66
          // this.toastrService.success('Company Information Updated Successfully');
        },
        (error) => {
          this.spinnerService.hide();
          // this.toastrService.error(error.message?.error);
        }
      );
  }


  getRFI(id) {
    //  + '/' + id
    this.spinnerService.show();
    this.httpService.getData(PATH.RFI).subscribe((res: any) => {
      this.responseRFI = res;
      this.spinnerService.hide();
    },
      (error) => {
        this.spinnerService.hide();
        this.toastrService.error(error.message?.error);
      }
    )
  }


  addNote() {
    this.spinnerService.show();
    let data = { notesText: this.notes };
    this.httpService.postData(PATH.NOTES_SUBMIT,data).subscribe((res) => {
        this.toastrService.success('Notes Added Successfully!');
        this.getNotes();
        this.notes = '';
        this.spinnerService.hide();

      },(error) => {
        this.spinnerService.hide();
        this.toastrService.error(error.message?.error);
      }
    );
  }

  getNotes() {
    this.httpService.getData(PATH.GET_SUBMIT).subscribe(
      (res: any) => {
        this.notesRes = res;
      },
      (error) => {}
    );
  }
}

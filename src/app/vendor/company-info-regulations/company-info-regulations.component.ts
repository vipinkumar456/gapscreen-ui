import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/app.constant';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-regulations',
  templateUrl: './company-info-regulations.component.html',
})
export class CompanyInfoRegulationsComponent implements OnInit {
  @Output('getCompanyInfo') callParent: EventEmitter<any> = new EventEmitter();

  checkboxes: Array<any>;
  user: any;
  companyInfo: any = {};
  regulations: Array<any> = [];
  disableBtn:boolean = false;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private appCookieService: AppCookieService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.checkboxes = [
      { title: 'terms', label:'Terms & Conditions', value: false },
      { title: 'privacy', label:'Privacy Policy', value: false },
    ];
    this.user = JSON.parse(this.appCookieService.get('digiUser'));
    this.getCompanyInfo();
  }

  getCompanyInfo() {
    this.spinnerService.show();
    this.httpService.getData(PATH.GET_REGULATIONS).subscribe(
      (res:any) => {
        // this.spinnerService.hide();
        let resData = res;
        // this.checkboxes = res.regulations;
        this.checkboxes.forEach((elm)=>{
          if(elm.title=='terms'){
            elm.fileName = resData.termsAndConditions
          }
          if(elm.title=='privacy'){
            elm.fileName = resData.privacyPolicy
          }
        })
        this.getCompanyInfo1()
      },
      (err) => {
        this.spinnerService.hide();
      }
    );
  }

  getCompanyInfo1() {
    this.spinnerService.show();
    this.httpService.getData(PATH.COMPANY_INFORMATION).subscribe((res: any) => {
      if (!res.checkboxes) {
          res.checkboxes = {};
          this.checkboxes.map((o) => {
            res.checkboxes[o] = false;
          });
        }else{  
          this.checkboxes.map((o) => {
              o.value = res.checkboxes[o.title];
          });
        }
          // if (!res) {
          //   this.spinnerService.hide();
          //   return;
          // }
          // if (!res.checkboxes) {
          //   res.checkboxes = {};
          //   this.checkboxes.map((o) => {
          //     res.checkboxes[o] = false;
          //   });
          // }
          // let branches = [];
          // if (res.branchInOtherCountry) {
          //   res.branchInOtherCountry.map((o) => {
          //     branches.push({ branch: o });
          //   });
          //   res.branchInOtherCountry = branches;
          // }

          this.spinnerService.hide();
          this.companyInfo = res;
          if(this.companyInfo.status == 'Submitted'){
            this.disableBtn = true;
          }

        },
        (error) => {
          this.spinnerService.hide();
        }
      );
  }

  onSubmit(form: FormGroup) {
    let formVal=form.value;
    if(!formVal.terms){
      this.toastrService.error("Please accept Terms & Conditions");
      return
    }
    if(!formVal.privacy){
      this.toastrService.error("Please accept Privacy Policy");
      return
    }
    let checkboxData = {};
    this.checkboxes.forEach((q) => {
      checkboxData[q.title] = q.value;
    });
    form.markAllAsTouched();
    this.companyInfo['checkboxes'] = checkboxData;
    this.updateCompanyInfo();
  }

  updateCompanyInfo() {
    this.spinnerService.show();
    let branches = [];
    this.companyInfo.step = 6;
    this.httpService.updateData(PATH.COMPANY_INFORMATION, this.companyInfo)
      .subscribe(
        (res) => {
          // this.companyInfo = res;
          this.spinnerService.hide();
          this.router.navigate(['/vendor/completed']);
        },
        (error) => {
          this.spinnerService.hide();
          this.toastrService.error(error.message.message);
        }
      );
  }

  back() {
    this.router.navigate(['/vendor/vendor-info/4']);
    this.callParent.emit({
      step: 5,
      url: '/vendor/vendor-info/4',
    });
  }

  getLoggedInVendor(){
    
  }



    checkDocumentType(filename){
      let fileType = filename.split('.').pop();
      if(fileType == 'jpeg'){
        return 'image/jpeg';
      }
      if(fileType == 'pdf'){
        return 'application/pdf';
      }
      if(fileType == 'png'){
        return 'image/png';
      }
      if(fileType == 'gif'){
        return 'image/gif';
      }
    }
  
  openFile(filename){
    let type = this.checkDocumentType(filename);
      this.httpService.download(PATH.GET_UPLOADED_FILE+filename).subscribe((res)=>{
        var file = new Blob([res], {type: type});
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
  }

}

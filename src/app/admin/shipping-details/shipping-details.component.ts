import { AppCookieService } from 'src/app/services/cookieService';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component,ElementRef,EventEmitter,OnInit,Output,ViewChildren} from '@angular/core';
import {ActivatedRoute,Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { PATH } from 'src/app/app.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
declare let $: any;
import * as moment from 'moment';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss']
})
export class ShippingDetailsComponent implements OnInit {
  style = 'width: 95%';
  hasError: boolean;
  infoForm:any;
  formSubmitAttempt: boolean = false;
  organizationId: any;
  shareHolders:any;
  boardOfDirectors:any;
  branchInOtherCountry:any;
  maxDate = this.ngbDateParserFormatter.parse(
    moment(new Date()).format('DD-MM-YYYY')
  );
  onError(obj) {
    this.hasError = obj;
  }

  constructor(   private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appCookieService: AppCookieService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private el: ElementRef,
    private spinnerService: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    ) { }
    
    

    ngOnInit(): void {
      this.route.params.subscribe((res)=>{
        if(res.id){
          this.organizationId=res.id;
        }
      })
      // this.prepareInfoForm();
      this.getCompanyInfo();
  }

    prepareInfoForm(){
      this.infoForm = this.formBuilder.group({
        answers: [null],
        addressApproval: [null],
        certificateOfIncorporation: [null],
        financialStatementsLast3Years: [null],
        insuranceCertificate: [null],
        memorandumArticlesOfAssociation: [null],
        tradingLicense: [null],
        checkboxes: [null],
        companyName: ['', Validators.required],
        vatRegistrationNumber: ['', Validators.required],
        websiteUrl: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
            ),
          ],
        ],
        parentCompany: [''],
        phoneNumber: ['', Validators.required],
        product: ['', Validators.required],
        category: ['', Validators.required],
        companyRegistrationNumber: ['', Validators.required],
        contactPerson: ['', Validators.required],
        dateOfIncorporation: ['', Validators.required],
        dunsNumber: [''],
        emailAddress: ['', [Validators.required, Validators.email]],
        formerName: [''],
        legalStatus: ['', Validators.required],
        operationalAddress: this.formBuilder.group({
          address: ['', Validators.required],
          city: ['', Validators.required],
          country: ['', Validators.required],
          postalCode: [''],
        }),
        isSameAddress: [false],
        registeredAddress: this.formBuilder.group({
          address: ['', Validators.required],
          city: ['', Validators.required],
          country: ['', Validators.required],
          postalCode: [''],
        }),
        step: [2],
        boardOfDirectors: this.formBuilder.array([this.addDirectorsGroup(null)]),
        shareHolders: this.formBuilder.array([this.addShareholdersGroup(null)]),
        branchInOtherCountry: this.formBuilder.array([this.addBranchGroup(null)]),
      });
    }



  getCompanyInfo() {
    this.spinnerService.show();
    this.httpService.getData(PATH.COMPANY_INFORMATION).subscribe(
        (res: any) => {
          
          this.infoForm=res;
          this.shareHolders=res.shareHolders;
          this.boardOfDirectors=res.boardOfDirectors;
          this.branchInOtherCountry=res.branchInOtherCountry;
          this.spinnerService.hide();
        },
        (error) => {
        }
      );
  }
  addDirectorsGroup(data): FormGroup {
    return this.formBuilder.group({
      fullName: [data ? data.fullName : '', Validators.required],
      nationality: [data ? data.nationality : '', Validators.required],
      address: [data ? data.address : '', Validators.required],
      postalCode: [data ? data.postalCode : '', Validators.required],
      countryOfResidence: [
        data ? data.countryOfResidence : '',
        Validators.required,
      ],
      passportNumber: [data ? data.passportNumber : '', Validators.required],
      directorsAddressProof: [data ? data.directorsAddressProof : null],
      directorsPassport: [data ? data.directorsPassport : null],
      directorsPersonalIdentification: [
        data ? data.directorsPersonalIdentification : null,
      ],
    });
  }

  addShareholdersGroup(data): FormGroup {
    return this.formBuilder.group({
      fullName: [data ? data.fullName : '', Validators.required],
      ownedPercentage: [data ? data.ownedPercentage : '', Validators.required],
      countryOfResidence: [
        data ? data.countryOfResidence : '',
        Validators.required,
      ],
      nationality: [data ? data.nationality : '', Validators.required],
      shareholderAddressProof: [data ? data.shareholderAddressProof : null],
      shareholderPassport: [data ? data.shareholderPassport : null],
      shareholderPersonalIdentification: [
        data ? data.shareholderPersonalIdentification : null,
      ],
    });
  }
  addBranchGroup(data): FormGroup {
    return this.formBuilder.group({
      branch: [data ? data.branch : ''],
    });
  }
}

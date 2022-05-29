import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppCookieService } from 'src/app/services/cookieService';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  supplier: any;
  maxDate = new Date();
  companyInfo: any = {};
  fileDetails: any = {};
  infoForm: any;
  checked: boolean = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  order: any = 'desc';
  col: any = 'createdDate';
  isCreateSurvey: boolean = false;
  isSurveyPage: boolean = false;
  isQuestionAdd: boolean = false;
  city: string;
  quantitative: string;
  qualtitative: string;
  quantity: any = [];
  quality: any = [];
  comment: boolean = false;
  arr = Array;
  index: any;
  surveyResult: any;
  inviteData: any;
  surveyDetails: any;
  updateSurveyId: any;
  inviteSurvey: boolean = false;
  oneThree: boolean = false;
  oneFive: boolean = false;
  categories: any;
  removeIndex:any;
  createData:any=null;
  documents = [
    {
      title: 'Upload Contact',
      name: 'uploadContact',
    },
  ];
  locationheaders: Array<any>;
  surveyheaders: Array<any>;
  surveyForm: any;
  isAddSection: boolean = false;
  survey: boolean = true;
  formSubmitAttempt: boolean = false;
  display: boolean = false;
  getSurveyId:any;
  @ViewChild('file') fileInput: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appCookieService: AppCookieService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.supplier = [
      { name: 'name' },
    ];
    this.prepareHeader();
    this.prepareSurveyHeader();
    this.prepareinfoForm();
    this.prepareSurveyForm();
    this.getSurvey();
    this.getInviteId();
  }

  public SurveyForm = this.formBuilder.group({
    comment: [""],
    questionsAnswer: this.formBuilder.array([]),
    title: ["", [Validators.required]]
  })

  public InviteForm = this.formBuilder.group({
    surveyId: [""],
    vendorId: ["",[Validators.required]]
  })

  addQuestionsAnswer(data): void {
    (<FormArray>this.SurveyForm.get('questionsAnswer')).push(this.addAnswer(data));
  }

  // addEmail(): void {
  //   (<FormArray>this.InviteForm.get('mail')).push(this.addemail());
  // }

  // addemail() {
  //   return this.formBuilder.group({
  //       email: ["", [Validators.required]],
  //     })
  // }


  addAnswer(data) {
    if (data) {
      return this.formBuilder.group({
        question: [data.question],
        answerParameter: [data.answerParameter],
        rating: [data.rating],
      })
    }
    else {
      return this.formBuilder.group({
        answerParameter: ["", [Validators.required]],
        rating: ["",],
        question: ["", [Validators.required]]
      })
    }
  }

  inviteSend() {
    if (this.SurveyForm.invalid) {
      this.toastrService.error('Please fill all the required fields');
      return;
    } else {
      this.spinnerService.show();
      let payload = this.SurveyForm.value;
      const request = this.httpService.updateData(PATH.SURVEYS + '/{id}?id=' + this.getSurveyId, payload)
      request.subscribe((res) => {
        this.spinnerService.hide();
        this.display = true;
        // this.addEmail();    
      }, (err) => {
        this.spinnerService.hide();
        this.toastrService.error(err.message.message);
      })
    }
  }



  submitSurvey() {
    if (this.SurveyForm.invalid) {
      this.toastrService.error('Please fill all the required fields');
      return;
    } else {
        this.spinnerService.show();
        let payload = this.SurveyForm.value;

        const request = this.updateSurveyId ? this.httpService.updateData(PATH.SURVEYS + '/{id}?id=' + this.updateSurveyId, payload) : this.httpService.postData(PATH.SURVEYS, payload)
        request.subscribe((res) => {
          this.toastrService.success('survey saved Successful!');
          this.spinnerService.hide();
          this.isCreateSurvey = false;
          this.survey = false;
          this.inviteSurvey = true;
          this.checked == false;
          this.getInviteData(res.id);
          this.SurveyForm.reset();
        }, (err) => {
          this.spinnerService.hide();
          this.toastrService.error(err.message.message);
        })
      
    }

  }

  getSurvey() {
    this.spinnerService.show();
    this.httpService.getData(PATH.SURVEYS + 's').subscribe((res: any) => {
      this.surveyResult = res;
      // res.forEach(element => {
      // this.inviteData = element.questionsAnswer;
      // this.inviteData.forEach(rating => {
      //    });
      // });
      this.spinnerService.hide();
    },
      (error) => {
        this.spinnerService.hide();
        this.toastrService.error(error.message?.error);
      })
  }



  delete(item) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete?",
      accept: () => {
        this.spinnerService.show();
        this.httpService
          .deleteData(PATH.SURVEYS + '/' + item)
          .subscribe(
            (res: any) => {
              this.spinnerService.hide();
              this.toastrService.success('Deleted Successfully!')
              this.getSurvey();
            },
            (error) => {
              this.spinnerService.hide();
              this.toastrService.error(error.message?.error);
            }
          );
        this.confirmationService.close();

      },
      reject:()=>{
        this.confirmationService.close();
        // this.getSurvey();
      }
    })
  }
  edit(id) {
    this.spinnerService.show();
    this.SurveyForm.reset();
    this.isCreateSurvey = true;
    this.comment = true;
    this.checked = true;
    this.updateSurveyId = id;
    this.httpService.getData(PATH.SURVEYS + '/' + id).subscribe((res: any) => {
      this.SurveyForm.patchValue(res);
      this.surveyDetails = res;
      let surveyDetail = this.surveyDetails.questionsAnswer;
      if (surveyDetail.length != 0) {
        for (let i = 0; i < surveyDetail.length; i++) {
          this.index = i;
          (<FormArray>this.SurveyForm.get('questionsAnswer')).removeAt(i);
          this.addQuestionsAnswer(surveyDetail[i])
          this.removeIndex = i ;
          this.onChange(surveyDetail[i].answerParameter, i)
        }
      }
      else {
        this.addQuestionsAnswer(null);
      }
      this.spinnerService.hide();
    },
      (error) => {
        this.spinnerService.hide();
        this.toastrService.error(error.message?.error);
      }
    )
  }


  getInviteData(id) {
    this.spinnerService.show();
    this.httpService.getData(PATH.SURVEYS + '/' + id).subscribe((res: any) => {
      this.surveyResult = res;
      this.getSurveyId = res.id;
      this.SurveyForm.patchValue(res);
      this.inviteData = res.questionsAnswer;
      // res.forEach(element => {
      // this.inviteData = element.questionsAnswer;
      // this.inviteData.forEach(rating => {
      //    });
      // });
      this.spinnerService.hide();
    },
      (error) => {
        this.spinnerService.hide();
        this.toastrService.error(error.message?.error);
      }
    )
  }

  prepareHeader() {
    this.locationheaders = [
      { name: 'name', header: 'Name', sort: true, isAsc: true },
      { name: 'address', header: 'Address', sort: true, isAsc: true },
      { name: 'active', header: 'Active', sort: true, isAsc: true },
      { name: 'action', header: 'Action', sort: false, isAsc: false },
    ];
  }

  prepareSurveyHeader() {
    this.surveyheaders = [
      { name: 'created', header: 'Created on', sort: false, isAsc: true },
      { name: 'surveyTitle', header: 'Survey Title', sort: false, isAsc: true },
      // { name: 'action', },
      { name: 'action', header: 'Action', sort: false, isAsc: true },
    ];
  }

  prepareinfoForm() {
    this.infoForm = this.formBuilder.group({
      name: [""],
      legalName: [""],
      legalAddress: [''],
      businessRegistrationNumber: ['', [Validators.email]],
      phoneNumber: [''],
      annualValue: [""],
      startDate: [''],
      expirationDate: [''],
      note: [''],
      extendableContract: ['']
    })
  }

  prepareSurveyForm() {
    this.surveyForm = this.formBuilder.group({
      surveyChecl: [''],
      surveyQuestions: this.formBuilder.array([this.addQuestionsGroup(null)]),

    })
  }


  addQuestionsGroup(data): FormGroup {
    return this.formBuilder.group({
      question: ['', Validators.required],
      answerParameter: [''],
      quantitative: [''],
      qualtitative: ['']
    });
  }

  addQuestions() {
    (<FormArray>this.surveyForm.get('surveyQuestions')).push(
      this.addQuestionsGroup(null)
    );
  }

  onChange(deviceValue?, i?) {

    if (deviceValue == "Quantitative") {
      this.quantity[i] = true;
      this.quality[i] = false;
    }
    if (deviceValue == "Qualitative") {
      this.quantity[i] = false;
      this.quality[i] = true;
    }
  }

  checkValue(event: any) {
    if (event == 'B') {
      this.checked = true;
    }
    if (event == 'A') {
      this.checked = false;
    }
  }


  sendInvite(){
    this.InviteForm.patchValue({
      surveyId:this.getSurveyId
    })
    let InviteData = this.InviteForm.value;
    if(this.InviteForm.valid){
      this.spinnerService.show();
      let payload = {};
      const request =  this.httpService.postData(PATH.SURVEY_INVITE+'?surveyId='+InviteData.surveyId + "&vendorId="+InviteData.vendorId,payload)
      request.subscribe((res) => {
      this.spinnerService.hide();
      this.toastrService.success('Invite Send Successfully!')
      this.display = false;
      this.backSurvey();
      },
       (err) => {
        this.spinnerService.hide();
        this.toastrService.error(err.message.message);
      })
    }
    else{
      this.toastrService.error('Please fill all the required fields');
      return;
    }
  }


  getInviteId(){
    this.spinnerService.show();
    this.httpService.getData(PATH.GET_ALL_VENDOR).subscribe((res: any) => {
    this.categories = res.content;
    this.spinnerService.hide();
    },
      (error) => {
        this.spinnerService.hide();
        this.toastrService.error(error.message?.error);
      }
    )
  
  }
  
  cancelMail(){
    this.display = false;
  }

  addSurvey() {
    this.survey = false;
    this.isCreateSurvey = true;
    this.comment = false;
    this.checked = false;
    if(this.createData == null){
    this.addQuestionsAnswer(0);}

  }

  backSurvey() {
    this.isCreateSurvey = false;
    this.inviteSurvey = false;
    this.survey = true;
    // this.quantity = true;
    // this.quality = false;
    this.SurveyForm.reset();
    for (let i = 0; i <= this.removeIndex; i++) { 
    this.quantity[i] = false;
    this.quality[i] = false;
    (<FormArray>this.SurveyForm.get('questionsAnswer')).removeAt(i);  
    }
    this.createData = 1;
    this.getSurvey();
  }

  remove(index) {
    (<FormArray>this.SurveyForm.get('questionsAnswer')).removeAt(index);
  }

  get f() {
    return this.SurveyForm.controls;
  }

  get i() {
    return this.InviteForm.controls;
  }
}

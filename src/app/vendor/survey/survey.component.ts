import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';
import {DialogService} from 'primeng/dynamicdialog';
import { AddvendorscreenSurveyComponent } from '../addvendorscreen-survey/addvendorscreen-survey.component';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  isCreateSurvey:boolean=false;
  isSurveyPage:boolean=false;
  isQuestionAdd:boolean=false;
  formSubmitAttempt: boolean = false
  responsiveOptions;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  order: any = 'desc';
  col: any = 'createdDate';
  surveyheaders: Array<any>;
  numberOfElements:any;
  public instructionForm = this.formbuilder.group({
    eroles: [''],
    message: ['', Validators.required],

  })
  constructor(private formbuilder: FormBuilder,public dialogService:DialogService) { 
  }

  ngOnInit(): void {
    this.prepareSurveyHeader();
  }

  addSurvey(){
    this.isCreateSurvey=true;
    this.isQuestionAdd=false;
  }

  backSurvey(){
    this.isCreateSurvey=false;
    this.isQuestionAdd=false;
  }

  surveyData: Array<any> = [
    {date:'10 Oct 2021',item: 'Do you have an environment policy and targets to improve the company environmental footprint', status:'started Now' },
    {date:'10 Oct 2021',item: 'Do you have an environment policy and targets to improve the company environmental footprint ', status:'started Now'},
    {date:'10 Oct 2021',item: 'Do you have an environment policy and targets to improve the company environmental footprint', status:'Completed' },
    {date:'10 Oct 2021',item: 'Do you have an environment policy and targets to improve the company environmental footprint', status:'Completed' },
  ];


    prepareSurveyHeader(){
      this.surveyheaders = [
        { name: 'date', header: 'Date', sort: false,isAsc:false},
        { name: 'item', header: 'Survey Title', sort: false,isAsc:false},
        { name: 'status', header: 'Status', sort: false,isAsc:false},
        {name:'',header:''}
      ];
    }
    get f() {
      return this.instructionForm.controls
    }
    postData() {
      this.formSubmitAttempt = true
      if (this.instructionForm.invalid) {
        return;
      } else {
        this.formSubmitAttempt = false;
        this.instructionForm.reset();
      }
    }
 

  addNewRequestPopup(){
    const ref=this.dialogService.open(AddvendorscreenSurveyComponent,
      {
        // header:'Add Port',
        width:'50%',

        // contentStyle: {"overflow-y": "hidden"},
      })
  } 
  

}

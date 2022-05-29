import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {  ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from './../../services/http.service';

import { Country } from 'country-state-city';
import { PATH } from 'src/app/app.constant';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

 
  showMe:boolean=false
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  headers: Array<any>
  cisDataBestMatchList: Array<any>;
  checked:boolean=false;
  header:Array<any>;
  cisDataPotentialMatchList:Array<any>;
  searchData:any
  cisId:any;
  storeMatch:any=[];
  formSubmitAttempt:boolean=false;
  cisDescription:any=[]
  description:any=[]

  order: any = 'desc';
  col: any = 'createdDate';
  numberOfElements:any;
  constructor(
    private fb: FormBuilder, 
    private toastrService: ToastrService,
    private router: Router,
    private httpService :HttpService,
    private ar:ActivatedRoute,
    private spinnerService: NgxSpinnerService,

    ) {}

  
  public companySearchForm = this.fb.group({
    checkbox: ['',Validators.required],
  })

  ngOnInit(): void {
    this.ar.params.subscribe((params)=>{
      this.cisId=params.id;
    })
    this.prepareHeaders();
    this.potentialHeaders();
    this.getData();
  }

  prepareHeaders(){
    this.headers = [
      { name: 'name', header: 'Name', sort: false,isAsc:true},
      { name: 'entityType', header: 'Entity Type', sort: false,isAsc:false},
      { name: 'description', header: 'Description', sort: false,isAsc:false},
      { name: '', header: '',},
    ]; 
  }

  potentialHeaders(){
    this.header = [
      { name: 'name', header: 'Name', sort: false,isAsc:true},
      { name: 'entityType', header: 'Entity Type', sort: false,isAsc:false},
      { name: 'description', header: 'Description', sort: false,isAsc:false},
      { name: '', header: '',},
    ]; 
  }

  checkValue(event){
    if (event == 'B') {
      this.checked = true;
    }

    if (event == 'A') {
      this.checked = false;
    }
  }

  changePath(entityId){
    
    if(!this.checked){
      this.toastrService.error('Checkbox is Required');
      return
      
    }
    this.router.navigate(['/customer/bank-dashboard',this.cisId]);
    localStorage.setItem('entityId',entityId);
  }

  view(entityId){
    localStorage.setItem('entityId',entityId);
    this.router.navigate(['/customer/bank-dashboard',this.cisId]);
  }
  
  getData(){
    this.formSubmitAttempt=true;
    this.spinnerService.show();
        this.httpService.getDataSearch(PATH.GET_SEARCH_CIS_BY_ID + '/' + this.cisId).subscribe((res:any)=>{  
          this.searchData = res;  
          console.log('res',res);
          
          this.cisDataBestMatchList=this.searchData.cisDataBestMatchList;
          // this.cisDataBestMatchList.forEach(element=>{
          //   this.storeMatch=element.matchCount
          //   element.matchCount.forEach(elm => {
          //   });
          // })
          this.cisDescription = this.searchData.cisDataBestMatchList;
          this.cisDescription.forEach(element => {
            this.description=element.description
            console.log(this.description);
            
          });
          
          
          this.cisDataPotentialMatchList=this.searchData.cisDataPotentialMatchList;
          this.spinnerService.hide();
    },
     (err) => {
      this.spinnerService.hide();
      this.toastrService.error(err.message.message);
    }) 

  }

  
  postData(){
    this.formSubmitAttempt=true;
    if(this.companySearchForm.invalid){
      return;
    }else{
      this.formSubmitAttempt=false;
      this.companySearchForm.reset();
    }
  }
  
  onClear(){
    this.formSubmitAttempt=false
  }

  get f(){
    return this.companySearchForm.controls
  }

}

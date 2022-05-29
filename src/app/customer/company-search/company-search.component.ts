import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators, } from '@angular/forms';
import { Country } from 'country-state-city';
import { PATH } from 'src/app/app.constant';
import {Router } from '@angular/router';
@Component({
  selector: 'app-new-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss']
})
export class NewCompanySearchComponent implements OnInit {
  formSubmitAttempt:boolean=false;
  isCompany:boolean=true;
  isPortion:boolean=false
  isIndividual:boolean=false
  headers: Array<any>
  bestMatch: Array<any>;
  public countries = Country.getAllCountries();
  checked: boolean = false;
  maxDate = new Date();
  individual:boolean = false;
  companyDisplay:boolean = true ;
  CompanyData:any;
  cities:any=[];
  status:any;
  totalSearch=150;
  totalUsed;
  totalAvailable;

  constructor(private fb: FormBuilder,
    private httpService :HttpService,
    private spinnerService: NgxSpinnerService,
    private toastrService :ToastrService,
    private router : Router,
    ) {}


  public companySearchForm = this.fb.group({
    amlType:this.fb.array([]),
    // amlType:[[],Validators.required],
    country: ['',Validators.required],
    dob: ['',Validators.required],
    fuzziness: ['50',Validators.required],
    gender: ['male',Validators.required],
    name: ['',Validators.required],
    searchType: ['Company',Validators.required],
  })

  ngOnInit(): void {
    this.prepareHeaders();
    this.getData();
//   for (let i = 1; i <= 900; i++) {
//     setTimeout( ()=>{this.getData()},100);
// }
  }


  prepareHeaders(){
    this.headers = [
      { name: 'searchDate', header: 'Search Date', sort: false,isAsc:true},
      { name: 'name', header: 'Name', sort: false,isAsc:true},
      { name: 'entityType', header: 'Entity Type', sort: false,isAsc:false},
      { name: 'matchingThreshold', header: 'Matching Threshold', sort: false,isAsc:false},
      { name: 'searchFor', header: 'Search For', sort: false,isAsc:false},
      { name: 'status', header: 'Status', sort: false,isAsc:false},
    ]; 
    this.bestMatch=[
        {searchDate:'10 May,2022', name:'CENTERAL BANK OF IRAN', entityType:'Company', matching:'75%', searchFor:'Sanction, Adverse Media', status:'Search in Progress'},
        {searchDate:'10 May,2022', name:'CENTERAL BANK OF IRAN', entityType:'Company', matching:'75%', searchFor:'Sanction, Adverse Media', status:'View Result'},
        {searchDate:'10 May,2022', name:'CENTERAL BANK OF IRAN', entityType:'Company', matching:'75%', searchFor:'Sanction, Adverse Media', status:'View Result'}
    ]
  }


  getData(){
    this.spinnerService.show();
       let payload = this.companySearchForm.value;
        this.httpService.getDataSearch(PATH.GET_SEARCH_CIS).subscribe((res:any)=>{    
          this.CompanyData = res;  
          this.totalUsed = res.length;
          this.spinnerService.hide(); 
    },
     (err) => {
      this.spinnerService.hide();
      this.toastrService.error(err.message.message);
    }) 

  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.companySearchForm.get('amlType') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } 
    else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  get f(){
    return this.companySearchForm.controls;
  }

  postData(){

    if(this.companySearchForm.invalid){
      this.formSubmitAttempt=true;
      return;
    }    
    this.formSubmitAttempt=false;
    this.spinnerService.show();
    let fuzzinessData = this.companySearchForm.controls['fuzziness'].value;
    let ans = fuzzinessData / 100;
    this.companySearchForm.patchValue({ fuzziness:ans });
    let payload = this.companySearchForm.value;
    this.httpService.postDataSEarch(PATH.GET_SEARCH_CIS,payload).subscribe((res:any)=>{
    this.toastrService.success('search created Successful!');
    this.formSubmitAttempt=false;
    this.companySearchForm.reset();
    this.spinnerService.hide();
    this.status = res.id;
    this.getDataById(this.status);
    this.getData();
    },
     (err) => {
      this.spinnerService.hide();
      this.toastrService.error(err.message.message);
    }) 
  }

  onClear(){
    this.formSubmitAttempt=false
    this.isIndividual=false
    this.companySearchForm.reset();
  }

  company(data) {
     if(data == 'company'){
    this.companyDisplay = true;
    this.individual = false;
    }
    if(data == 'Individual'){
      this.companyDisplay = false;
      this.individual = true;
    }
    
  }
  view(id){
    this.router.navigate(['/customer/search-result',id]);
  }

  getDataById(id){
  this.httpService.getDataSearch(PATH.GET_SEARCH_CIS + '/' + id).subscribe((res:any)=>{
   this.checkStatus(res.status);
    },
     (err) => {
      this.toastrService.error(err.message.message);
    }) 
  }

  checkStatus(status){
 if(status =='COMPLETED'){
   this.getData();
   }
   if(status == 'CREATED'){
     this.getDataById(this.status);
   }
  }

}

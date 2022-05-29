import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';
import { NewEsgPopupComponent } from '../new-esg-popup/new-esg-popup.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendor-esg',
  templateUrl: './vendor-esg.component.html',
  styleUrls: ['./vendor-esg.component.scss']
})
export class VendorEsgComponent implements OnInit {

  supplier:any;
  maxDate=new Date();
  companyInfo: any = {};
  fileDetails: any = {};
  infoForm:any;
  checked: boolean=true;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  order: any = 'desc';
  col: any = 'createdDate';
  
  headers: Array<any>;
  companyQuestion:any;

  constructor( public dialogService:DialogService,
    private httpService: HttpService,
    private confirmationService:ConfirmationService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
        ) { }

  ngOnInit(): void {
  this.prepareHeader();
  this.getESG();
  }

  // esgQuestion: Array<any> = [
  //   { esgQuestion: 'Do you have an ESG policy and plan in place ?', score:'1'},
  //   { esgQuestion: 'Do you provide ESG training to staff?', score:'1'},
  //   { esgQuestion: 'Do you have an Environmental Policy and targets to improve the companys environmnetal footprint?', score:'3'},
  // ];
 

    prepareHeader(){
      this.headers = [
        { name: 'esgQuestion', header: 'ESG Question', sort: false,isAsc:true},
        { name: 'score', header: 'Score', sort: false,isAsc:true},
        { name: 'action', header: 'Action', sort: false,isAsc:false},
      ];
    }

    addNewEsg(){
      const ref=this.dialogService.open(NewEsgPopupComponent,
        {
          header:'Add ESG Question',
          width:'50%'
        });
        ref.onClose.subscribe(res => {
          this.getESG();
        });
   
    }
  
    getESG(){
      this.httpService.getData(PATH.SETTING_ESG).subscribe((res)=>{
        this.companyQuestion=res;
      }) 
    }
    

    delete(item){
      this.confirmationService.confirm({
        message:"Are you sure that you want to delete?",
        accept:()=>{
          this.spinnerService.show();
          this.httpService
            .deleteData(PATH.SETTING_ESG+ '/'+ item.id)
            .subscribe(
              (res: any) => {
                this.spinnerService.hide();
                this.toastrService.success('ESG Deleted Successfully!')
                this.getESG();
              },
              (error) => {
                this.spinnerService.hide();
                this.toastrService.error(error.message?.error);
              }
            );
        this.confirmationService.close();
        },
        reject:()=>{
          // this.getESG();
        this.confirmationService.close();

        }
      
      })
    }

    edit(itm) {
      const ref=this.dialogService.open(NewEsgPopupComponent,
        { data: itm,
          header:'Add Question',
          width:'50%'
        });
        ref.onClose.subscribe(res => {
          this.getESG();
        });
    }
}

import { Component, Input, OnInit, Output,EventEmitter,OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit,OnDestroy {

  accountData:any;
  products:any;


  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.ref.close('close');
  }
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    console.log(this.config.data);
    this.accountData=this.config.data;
  }

  sendData(itm){
    this.ref.close(itm);
  }

  ngOnDestroy(): void {
   
  }

  

}

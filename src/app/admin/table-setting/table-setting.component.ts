import { Component, OnInit,Input,Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-table-setting',
  templateUrl: './table-setting.component.html',
  styleUrls: ['./table-setting.component.scss']
})
export class TableSettingComponent implements OnInit {
  @Input() type:any;
  isRating:boolean=false;
  isTableSetting:boolean=false;
  constructor(private modal:NgbActiveModal,
              modalservice:NgbModal) { }

  ngOnInit(): void {
    this.type=='rating'?this.isRating=true:this.isTableSetting=true;
  }

  close(){
    this.modal.dismiss();
  }

}

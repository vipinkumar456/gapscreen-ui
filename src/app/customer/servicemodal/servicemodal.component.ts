import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-servicemodal',
  templateUrl: './servicemodal.component.html',
  styleUrls: ['./servicemodal.component.scss']
})
export class ServicemodalComponent implements OnInit {
  isSent:boolean=false;
  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(){
    this.activeModal.close();
  }

  save(){
    this.isSent=true;
  }

}

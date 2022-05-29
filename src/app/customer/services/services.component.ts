import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicemodalComponent } from '../servicemodal/servicemodal.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(  private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  addService(){
    const modalRef = this.modalService.open(ServicemodalComponent,{centered:true});
    modalRef.componentInstance.type = 'Service';
  }
}

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-companyitems',
  templateUrl: './create-companyitems.component.html',
  styleUrls: ['./create-companyitems.component.scss']
})
export class CreateCompanyitemsComponent implements OnInit {
  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(){
    this.activeModal.close();
  }

}

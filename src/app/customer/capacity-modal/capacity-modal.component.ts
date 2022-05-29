import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-capacity-modal',
  templateUrl: './capacity-modal.component.html',
  styleUrls: ['./capacity-modal.component.scss']
})
export class CapacityModalComponent implements OnInit {

  @Input() capacity;

  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(){
    this.activeModal.close();
  }

}

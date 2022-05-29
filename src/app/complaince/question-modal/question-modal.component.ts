import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent implements OnInit {

  @Input() type;

  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(){
    this.activeModal.close();
  }

}

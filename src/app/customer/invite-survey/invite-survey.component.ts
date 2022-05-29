import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-invite-survey',
  templateUrl: './invite-survey.component.html',
  styleUrls: ['./invite-survey.component.scss']
})
export class InviteSurveyComponent implements OnInit {
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

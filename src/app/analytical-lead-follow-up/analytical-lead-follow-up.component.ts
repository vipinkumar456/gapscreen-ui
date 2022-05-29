import { MessageService } from "primeng/api";
import { Component, OnInit } from '@angular/core';
import { data } from './data.model'
@Component({
  selector: 'app-analytical-lead-follow-up',
  templateUrl: './analytical-lead-follow-up.component.html',
  styleUrls: ['./analytical-lead-follow-up.component.scss']
})
export class AnalyticalLeadFollowUpComponent implements OnInit {

  data = new data()
  dataArray: any = [];
  constructor(
    private messageService: MessageService,
  ) { }
  tableNames: Array<any> = [];
  ngOnInit(): void {
    this.tableNames = [
      {
        name: "Product Offered",

      },
      {
        name: "Customer Name",

      },
      {
        name: "Mobile Number",

      },
      {
        name: "Alternate Mobile Number",

      },
      {
        name: "Contacted Mode",

      },
      {
        name: "Contacted On Date",

      },
      {
        name: "Response",

      },
      {
        name: "Interested (Y/N)",
      },
      {
        name: "Customer Remark",

      },
      {
        name: "Additional Data",

      },
      {
        name: "Lead Assigned Sol Id (Preferred Branch)",
      },
      {
        name: "Name of Preferred Branch Or Ram/Mcc",

      },
      {
        name: "Lead Status",

      },
      {
        name: "Entered By",
      },
      {
        name: "Date"
      },
      {
        name: "Action"
      }]
    this.data = new data();
    this.dataArray.push(this.data);
  }
  add() {
    if (this.dataArray.length < 3) {
      this.data = new data();
      this.dataArray.push(this.data)
    }
    else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Only 3 Follow up are allowed!",
      });

    }
  }
  onSubmit() {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Submitted Successfully",
    });

    console.log(this.dataArray);
  }
  removeForm(val) {
    const index: number = this.dataArray.indexOf(val);
    this.dataArray.splice(index, 1);
  }
}

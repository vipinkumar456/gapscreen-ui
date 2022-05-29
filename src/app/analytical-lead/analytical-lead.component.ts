import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-analytical-lead',
  templateUrl: './analytical-lead.component.html',
  styleUrls: ['./analytical-lead.component.scss']
})
export class AnalyticalLeadComponent implements OnInit {

  
tableNames: Array<any> = [];
data:Array<any>=[];
constructor() { }

  ngOnInit(): void {
    this.tableNames = [
      {
        name: "Lead Ref No. (Srn In Lead Da Table)",
        
      },
      {
        name: "Product Offered",
        
      },
      {
        name: "Lead Provided To Product Owner Division",
        
      },
      {
        name: "Zone",
        
      },
      {
        name: "Circle",
        
      },
      {
        name: "Branch Sol Id",
        
      },
      {
        name: "Sol Id Of  Ram / Mcc",
        
      },
      {
        name: "Ram / Mcc Name",
      },
      {
        name: "Customer Name",
       
      },
      {
        name: "Customer Id",
        
      },
      {
        name: "Account Number",
       },
      {
        name: "Mobile Number",
       
      },
      {
        name: "Alternate Mobile No.",
        
      },
      {
        name: "Digitally Active",
       },
      {
        name:'Action'
      }]
      this.data = [
        {
          name: "LEAD REF NO. ",
          
        },
        {
          name: "PRODUCT OFFERED No",
          
        },
        {
          name: "LEAD PROVIDED TO PRODUCT OWNER DIVISION",
          
        },
        {
          name: "ZONE",
          
        },
        {
          name: "CIRCLE",
          
        },
        {
          name: "BRANCH SOL ID",
          
        },
        {
          name: "SOL ID OF  RAM / MCC",
          
        },
        {
          name: "RAM / MCC NAME",
        },
        {
          name: "CUSTOMER NAME",
         
        },
        {
          name: "CUST_ID",
          
        },
        {
          name: "ACC_NUMBER",
         },
        {
          name: "MOB NO.",
         
        },
        {
          name: "ALTERNATE MOBILE NO.",
          
        },
        {
          name: "DIGITALLY ACTIVE",
         },
        ]
  
  }
}

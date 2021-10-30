import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  id:any;
  constructor(private route:ActivatedRoute) { }
  aclasses=["","","",""];
  ngOnInit(): void {
    
  }
  add(event):void{
    this.aclasses=["","","",""];
    this.aclasses[event.target.id-1]="focus";
    // console.log(event.target.id);

  }
}

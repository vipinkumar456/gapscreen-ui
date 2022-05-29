import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
  isCollapsed:boolean=true;
  constructor() { } 

  ngOnInit(): void {
  }
  collapsed(itm){
    itm=='collapsed'?this.isCollapsed=true:this.isCollapsed=false;
 
}
}

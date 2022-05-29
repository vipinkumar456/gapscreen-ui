import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { AppCookieService } from 'src/app/services/cookieService';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnInit {
  collapsed:boolean=true;
  isAdmin:boolean=false;
  isVendor:boolean=false;
  isCustomer:boolean=false;
  user:any;
  dashboardStep:any;

  constructor(private appCookieService:AppCookieService) { }

  @Output() sendData: EventEmitter<any> = new EventEmitter();
 
  ngOnInit(): void {
   
   if(localStorage.getItem('dashboardStep')){
    this.dashboardStep = localStorage.getItem('dashboardStep');
   }
    this.user = JSON.parse(this.appCookieService.get('digiUser'));
    if(this.user.roles[0]=='ROLE_ADMIN'){
      this.isAdmin = true;
    }
    if(this.user.roles[0]=='ROLE_VENDOR'){
      this.isVendor = true;
    }
    if(this.user.roles[0]=='ROLE_CUSTOMER'){
      this.isCustomer = true;
    }
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    if(this.collapsed){
      this.sendData.emit('collapsed');
    }
    else
    {
      this.sendData.emit('Not collapsed');
    } 
  }


  
}

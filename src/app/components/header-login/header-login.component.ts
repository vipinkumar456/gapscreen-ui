import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html'
})
export class HeaderLoginComponent implements OnInit {

  isLoginPage;

  constructor(private route:ActivatedRoute,) { }

  ngOnInit(): void {
    let routerLink = this.route.snapshot.routeConfig.path
    if(routerLink=='login'){
      this.isLoginPage = true
    }else{
      this.isLoginPage = false;
    }
  }

}

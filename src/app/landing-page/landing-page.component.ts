import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { SharedService } from "../services/shared.service";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements OnInit {
  token: string;
  role: any = {};
  roles:Array<any>=[]
  subscriptions: Subscription;
  isResponse:boolean=false;
  constructor(private route: ActivatedRoute,private router:Router,private sharedService:SharedService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    
    if(sessionStorage.getItem("gapRoles")){
      this.roles=JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }
    let subscription = this.sharedService.messageSource.subscribe(res=>{
      this.roles=res;
      this.isResponse = true;
      window.sessionStorage.setItem("gapRoles",JSON.stringify(res));
      this.getRoles()
      // this.getPageAuth(this.role)
    })
    this.subscriptions.add(subscription); 
  }
  
  getRoles(){
    this.roles.map((o) => {
      this.role[o.role]=true;
    });
  }

  ngAfterViewInit(){
    if (!sessionStorage.getItem('gapToken')) {
      this.router.navigate(["logout"])
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

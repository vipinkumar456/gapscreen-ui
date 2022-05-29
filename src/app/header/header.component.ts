import { Component, OnInit, HostListener } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from "@angular/router";
import { map, filter } from "rxjs/operators";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import { SharedService } from "../services/shared.service"
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  ssoUser: any = {};
  title: string = "GAP Screen";
  token: string;
  items = [
    // {
    //   label: 'My Profile', icon: 'pi pi-user'
    // },
    // { label: 'Branch :' + this.ssoUser['branch'], icon: 'pi pi-sitemap' },
    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: () => {
        this.logout();
      },
    },
  ];
  username: string = "";
  @HostListener("window:unload")
  clickClose() {
    
  }
  @HostListener("window:load")
  clickRefresh() {
    
  }
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private sharedService:SharedService
  ) {}

  ngOnInit(): void {
    this.token = this.activatedRoute.firstChild.snapshot.params["token"];

    if (this.token) {
      window.sessionStorage.setItem("gapToken", this.token);
      // window.sessionStorage.setItem("gapToken1", this.token);
    }
    this.router.navigate(["home"]);
    this.getUser();
  }
  getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe(
      (res) => {
        this.username = res.userName;
        this.sharedService.changeMessage(res.roles)
      },
      (eer) => {
        this.router.navigate(["logout"]);
      }
    );
  }
  update() {
    this.router.navigate(["users", "profile"]);
  }
  logout() {
    // sessionStorage.removeItem("gapToken");
    sessionStorage.clear()
    self.close();
  }
  user() {
    return sessionStorage.getItem("ssoUsername");
  }
}

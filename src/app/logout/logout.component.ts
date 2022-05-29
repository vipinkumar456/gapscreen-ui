import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goto() {
    let link="home";
    let API_URL;
    if (location.protocol == "http:") {
      if (window.location.hostname == "ssoedwdcap.edw.obc.co.in") {
        API_URL = "http://ssoedwdcap.edw.obc.co.in:8080/gap-ui/#/";
      } else if (
        window.location.hostname == "localhost" ||
        window.location.hostname == "3.95.36.75"
      ) {
        // API_URL = "http://3.95.36.75:8016/sso-ui/#/";
         API_URL = "http://localhost:4200/sso-ui/#/";
      } else {
        API_URL = "http://172.16.15.223:8080/sso-ui/#/";
      }
    } else {
      if (window.location.hostname == "ssoedwdcap.edw.obc.co.in") {
        API_URL = "https://ssoedwdcap.edw.obc.co.in:8443/sso-ui/#/";
      } else if (window.location.hostname == "3.95.36.75") {
        API_URL = "https://3.95.36.75:8016/sso-ui/#/";
      } else {
        API_URL = "https://172.16.15.223:8443/sso-ui/#/";
      }
    }
    let url = API_URL + link;
    console.log(url);
    window.open(url);
    // window.open("http://3.95.36.75:8016/#/" + link + "/" + token);
  }

}

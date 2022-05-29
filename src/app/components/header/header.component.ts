import { AppCookieService } from 'src/app/services/cookieService';
import { SharedService } from './../../services/shared.service';
import { Component,Input,Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { PATH } from 'src/app/app.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() collapsed:any;
  user: any;
  companyLogo: string = '';
  showRfi= true;
  notificationLength:0;
  notification:boolean=false;
  imgUrl;
  companyInfo:any;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private httpService: HttpService,
    private appCookieService: AppCookieService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.appCookieService.get('digiUser'));
    if(this.user.roles == 'ROLE_VENDOR'){
      this.getRFI();
    }

    this.getCompanyInfo();
    this.getLogo();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
    let sub = this.sharedService.loginUser.subscribe((res) => { 
      this.user = res;  
      this.getLogo();
    });
  }



  getCompanyInfo() {
    this.spinnerService.show();
    this.httpService.getData(PATH.COMPANY_INFORMATION).subscribe((res: any) => {
          this.companyInfo = res;
          this.getFile(this.companyInfo?.companyLogo)
          this.spinnerService.hide();
          },
        (error) => {
          this.spinnerService.hide();
        }
      );
  }


  getFile(data){
    this.httpService.getImage(PATH.GET_UPLOADED_FILE+data).subscribe((res)=>{
      this.imgUrl = res;
    })
  }

  getLogo() {
    let file = JSON.parse(this.appCookieService.get('digiLogo'));
 
    
    if(file){
      this.httpService
      .getData(PATH.GET_FILE + file.fileName)
      .subscribe((res: string) => {
        this.companyLogo = res;
      });
    }
    
  }
  
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

 
  getRFI() {
    this.spinnerService.show();
    this.httpService.getData(PATH.RFI).subscribe((res: any) => {
      this.notificationLength = res.length; 
      this.notification = true; 
      this.spinnerService.hide();
    },
      (error) => {
        this.spinnerService.hide();
        this.toastrService.error(error.message?.error);
      }
    )
  }
  
  goToCompanyInfo(){
    this.router.navigate(['/vendor/vendor-info/1']);
  }
  
}

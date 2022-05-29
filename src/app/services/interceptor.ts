import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppCookieService } from './cookieService';
import { Router } from '@angular/router';
@Injectable()
export class AppInterceptor implements HttpInterceptor {


  constructor(private appCookieService:AppCookieService,private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = this.appCookieService.get("digiToken");

    if (token) {
      req = req.clone({
        url: req.url,
        setHeaders: {
          Authorization: `${token}`,
          // "Content-Type": "application/json",
        },
      });
    }
    else{
      // this.router.navigate(['login'])
    }
    // this.spinner.show();
    return next.handle(req).pipe(
      finalize(() => {
        // this.spinner.hide();
      })
    );
  }
}

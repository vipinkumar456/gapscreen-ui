import { Injectable, Inject, Optional } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { tap, finalize } from "rxjs/operators";
import { Subject } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from "@angular/router";
@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token= sessionStorage.getItem('gapToken')
    
    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.spinner.show();
    return next.handle(req).pipe(
      finalize(() => {
        this.spinner.hide();
      })
    );
    
  }
}

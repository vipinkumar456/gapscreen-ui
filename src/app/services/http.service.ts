import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, subscribeOn, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpResponse,
  HttpRequest,
} from "@angular/common/http";
import { PATH } from "../app.constants";
import { SERVER_PATHS } from "../app.constants";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  put(dt: any, COMPLIANCE_POST_SUBMIT: string) {
    throw new Error("Method not implemented.");
  }
  private selection$ = new BehaviorSubject(null);
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient, private router: Router) {}

  getUrl(url) {
    let API_URL;
    if (location.protocol == "http:") {
      if (
        window.location.hostname == "localhost" ||
        window.location.hostname == "3.95.36.75"
      ) {
        API_URL = SERVER_PATHS.LOCAL_HTTP + url;
      } else {
        window.location.hostname == "ssoedwdcap.edw.obc.co.in"
          ? (API_URL = SERVER_PATHS.PROD_HTTP + url)
          : (API_URL = SERVER_PATHS.DEV_HTTP + url);
      }
    } else {
      window.location.hostname == "172.16.15.223"
        ? (API_URL = SERVER_PATHS.DEV_HTTPS + url)
        : (API_URL = SERVER_PATHS.PROD_HTTPS + url);
    }
    console.log("request url---------->" + API_URL);
    return API_URL;
  }

  postData(data, path): Observable<any> {
    let url = this.getUrl(path);
    return this.http.post(url, data).pipe(catchError(this.error.bind(this)));
  }
  

  // Read
  getData(path, data?): Observable<any> {
    let httpParams = new HttpParams();
    if (data) {
      Object.keys(data).forEach(function (key) {
        httpParams = httpParams.append(key, data[key]);
      });
    }
    let url = this.getUrl(path);
    return this.http.get(encodeURI(url), { params: httpParams }).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.error.bind(this))
    );
  }

  // Read By ID
  getDataById(path, id): Observable<any> {
    let url = this.getUrl(path);
    return this.http.get(url).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.error.bind(this))
    );
  }

  // Update
  updateData(data, path): Observable<any> {
    let url = this.getUrl(path);
    return this.http.put(url, data, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.error.bind(this))
    );
  }
  patch(data, path): Observable<any> {
    let url = this.getUrl(path);
    return this.http
      .patch(url, data, { headers: this.headers })
      .pipe(catchError(this.error.bind(this)));
  }
  markInactive(path): Observable<any> {
    let url = this.getUrl(path);
    return this.http
      .put(url, {}, { headers: this.headers })
      .pipe(catchError(this.error.bind(this)));
  }
  download(path, data?): Observable<any> {
    let httpParams = new HttpParams();
    if (data) {
      Object.keys(data).forEach(function (key) {
        httpParams = httpParams.append(key, data[key]);
      });
    }
    let url = this.getUrl(path);
    return this.http
      .get(encodeURI(url), {
        headers: this.headers,
        responseType: "blob",
        params: httpParams,
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError(this.error.bind(this))
      );
  }
  // Delete
  deleteData(path): Observable<any> {
    let url = this.getUrl(path);
    return this.http.delete(url).pipe(catchError(this.error.bind(this)));
  }

  deleteWithData(data, path): Observable<any> {
    let url = this.getUrl(path);
    // let option=new HttpRequest()
    let options={headers:new HttpHeaders(),body:data}
    return this.http.delete(url,options).pipe(catchError(this.error.bind(this)));
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(error.error ? error.error : errorMessage);
  }

  getSelectionObs(): Observable<any> {
    return this.selection$.asObservable();
  }

  setSelectionObs(selection: any) {
    this.selection$.next(selection);
  }

  get(path, param?): Promise<string> {
    let url = this.getUrl(path);
    return this.http
      .get(url, {
        headers: this.headers,
        responseType: "text",
      })
      .toPromise();
  }
  post(path, param: Array<any>): Promise<string> {
    let url = this.getUrl(path);
    return this.http
      .post(
        url,
        { inputList: param },
        { headers: this.headers, responseType: "text" }
      )
      .toPromise();
  }
}

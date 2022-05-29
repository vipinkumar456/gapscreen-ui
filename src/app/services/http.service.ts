import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, subscribeOn, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { SERVER_PATHS } from '../app.constant';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,) {}

  getUrl(url) {
    return location.protocol + url;
  }

  // Post
  postData(url, data): Observable<any> {
    let API_URL = this.getUrl(`${SERVER_PATHS.DEV}${url}`);
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }

  // Get
  getData(url) {
    let API_URL = this.getUrl(`${SERVER_PATHS.DEV}${url}`);

    return this.http.get(decodeURI(API_URL));
  }



  getImage(url: string) {
    let API_URL = this.getUrl(`${SERVER_PATHS.DEV}${url}`);
    return this.http.get(decodeURI(API_URL),
        {
          headers: new HttpHeaders().set('content-type', 'application/json'),
          responseType: 'blob',
          observe: 'response',
        }
      )
      .pipe(
        map((res: any) => {
          const blob = res.body;
          return this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(blob)
          );
        })
      );
  }

// Download 
download(url): Observable<any> {

  let httpParams = new HttpParams();
  let API_URL = this.getUrl(`${SERVER_PATHS.DEV}${url}`);
  return this.http
    .get(encodeURI(API_URL), {
      headers: this.headers,
      responseType: "blob",
      params: httpParams,
    })

    .pipe(map((res) => {
        return res;
      }),
      catchError(this.error.bind(this))

    );

}

  // Get Data with Params
  getDataWithParams(url, data?): Observable<any> {
    let httpParams = new HttpParams();
    if (data) {
      Object.keys(data).forEach(function (key) {
        httpParams = httpParams.append(key, data[key]);
      });
    }
    let API_URL = this.getUrl(`${SERVER_PATHS.DEV}${url}`);

    return this.http.get(encodeURI(API_URL), {
      params: httpParams,
    });
  }

  // Update
  updateData(url, data): Observable<any> {
    let API_URL = this.getUrl(`${SERVER_PATHS.DEV}${url}`);

    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  statusData(url): Observable<any> {
    let httpParams = new HttpParams();
    return this.http.patch(encodeURI(`${SERVER_PATHS.DEV}${url}`), {
      params: httpParams,
    });

  }
  // Update
  patchData(url, data): Observable<any> {
    let API_URL = this.getUrl(`${SERVER_PATHS.DEV}${url}`);

    return this.http
      .patch(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  // Delete
  deleteData(url): Observable<any> {
    let API_URL = this.getUrl(`${SERVER_PATHS.DEV}${url}`);

    return this.http.delete(API_URL).pipe(catchError(this.error));
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    if (typeof error == 'string') {
      return throwError(error);
    } else {
      let errorMessage = {};
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error;
      } else {
        errorMessage = { code: error.status, message: error.error };
      }
      return throwError(errorMessage);
    }
  }

  // Post
  postDataSEarch(url, data): Observable<any> {
    let API_URL = this.getUrl(`${SERVER_PATHS.DEV_SEARCH}${url}`);
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }

  // Get
  getDataSearch(url) {
    let API_URL = this.getUrl(`${SERVER_PATHS.DEV_SEARCH}${url}`);

    return this.http.get(decodeURI(API_URL));
  }


}

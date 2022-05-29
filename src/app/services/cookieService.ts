import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppCookieService {
  private cookieStore = {};

  constructor() {
    this.parseCookies(document.cookie);
  }

  public parseCookies(cookies = document.cookie) {
    this.cookieStore = {};
    if (!!cookies === false) {
      return;
    }
    const cookiesArr = cookies.split(';');
    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split('=');
      this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
    }
  }

  get(key: string) {
    this.parseCookies();
    // return !!this.cookieStore[key] ? this.cookieStore[key] : null;
    return sessionStorage.getItem(key);
  }
  getCookie(key: string) {
    this.parseCookies();
    return !!this.cookieStore[key] ? this.cookieStore[key] : null;
    // return sessionStorage.getItem(key);
  }

  remove(key: string) {
    sessionStorage.removeItem(key);
    document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
  }

  set(key: string, value: string) {
    sessionStorage.setItem(key, value);
    document.cookie = key + '=' + (value || '');
  }
}

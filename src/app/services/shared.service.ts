import { Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class SharedService {
  messageSource = new Subject<any>();
  currentMessage = this.messageSource.asObservable();
  private subject = new Subject<any>();
  sendClickEvent() {
    this.subject.next();
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
  changeMessage(message: Array<any>) {
    this.messageSource.next(message)
  }
}

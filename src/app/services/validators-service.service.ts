import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsServiceService {

  constructor() { }
  space(event:any){
    if(event.target.selectionStart===0 && event.code=== "Space"){
      event.preventDefault();
    }
  }
}

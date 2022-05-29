

import { Injectable, Attribute } from "@angular/core";
import { Validators } from "@angular/forms";

@Injectable()
export class UserForm {
  getForm() {
    return {

      "roles": [null, [Validators.required]],
      "userName": ["", [Validators.required]],
    }
    // {
    //     "addressType": ["HOME"],
    //     "city": ["", [Validators.required, Validators.pattern(/^[a-zA-Z_ ]{1,100}$/)]],
    //     "houseNumber": ["", [Validators.required, Validators.pattern(/^.{1,100}$/)]],
    //     "id": [null],
    //     "landMark": ["", [Validators.required, Validators.pattern(/^.{1,100}$/)]],
    //     "pinCode": ["", [Validators.required, Validators.pattern(/^[1-9]{1}[0-9]{5}$/)]],
    //     "state": ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9_ ]{1,100}$/)]],
    //     "street": ["", [Validators.required, Validators.pattern(/^.{1,100}$/)]],
    // }
  }
}

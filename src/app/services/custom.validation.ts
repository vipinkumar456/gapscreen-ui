import { FormControl } from "@angular/forms";

export function mobile(control: FormControl) {
    if (!control.value) { return null; }
    if ((/^((\\+91-?)|0)?[0-9]{10}$/g).test(control.value)) {
        return null;
    } else {
        return { "mobile": true };
    }
}

export function email(control: FormControl) {
    if (!control.value) { return null; }
    if ((/\S+@\S+\.\S+/g).test(control.value)) {
        return null;
    } else {
        return { "email": true };
    }  
}

export function number(control: FormControl) {
    if (!control.value) { return null; }
    if ((/^\d*[.]?\d*$/g).test(control.value)) {
        return null;
    } else {
        return { "number": true };
    }
    
}

export function multiEmail(control: FormControl) {
    if (!control.value) { return null; }
    if ((/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/g).test(control.value)) {
        return null;
    } else {
        return { "multiEmail": true };
    }
}


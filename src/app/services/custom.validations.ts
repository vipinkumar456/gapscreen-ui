import { AbstractControl, FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export function email  (control: FormControl) {
    if (!control.value) { return null; }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)) {
        return null;
    } else {
        return { "email": true };
    }
}

export function website  (control: FormControl) {
    if (!control.value) { return null; }
    if (/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(control.value)) {
        return null;
    } else {
        return { "website": true };
    }
}

export function businessEmail  (control: FormControl) {
    if (!control.value) { return null; }
    if (/^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$/.test(control.value)) {
        return null;
    } else {
        return { "businessEmail": true };
    }
}

export function websiteUrl  (control: FormControl) {
    if (!control.value) { return null; }
    if (/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(control.value)) {
        return null;
    } else {
        return { "websiteUrl": true };
    }
}

export function noWhitespace(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
export function noExtraWhiteSpace(control: FormControl) {
    if (!control.value) { return null; }
    if (/^([a-zA-Z0-9]+\s)*([a-zA-Z0-9]+)$/.test(control.value)) {
        return null;
    } else {
        return { "noextrawhitespace": true };
    }
}

export function onlyCharacters(control: FormControl) {
    if (!control.value) { return null; }
    if (/^([a-zA-Z]*)$/.test(control.value)) {
        return null;
    } else {
        return { "onlycharacters": true };
    }
}

export function password(control: FormControl) {
    if (!control.value) { return null; }
    if (/(?=^.{8,25}$)(?=(?:.*?\\d){2})(?=.*[a-zA-Z]{2})(?=(?:.*?[!@#$%^&*?_~-]){2})(?!.*\\s)[0-9a-zA-Z!@#$%^&*?_~-]*/.test(control.value)) {
        return null;
    } else {
        return { "password": true };
    }
}



export function ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}




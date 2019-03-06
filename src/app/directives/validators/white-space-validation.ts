import { Directive } from '@angular/core';
import { Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[appSpacevalidation]',
})
export class WhiteSpaceValidator implements Validator {
    static validate(c: FormControl): { [key: string]: any } {

        return c.value == null || c.value.length === 0 || c.value.trim().length === 0 ? { 'required': true } : null;
    }
    validate(c: FormControl): { [key: string]: any } {
        return WhiteSpaceValidator.validate(c);
    }

}

import { AbstractControl, ValidatorFn } from '@angular/forms';
export function equalvalidator(fieldWith: string): ValidatorFn {
    return (c: AbstractControl): { [key: string]: any } => {
        // control value
        const v = c.root.get(fieldWith);
        // self value
        const e = c.value;

        // value not equal
        if (v && e && e !== v.value) { return { validateEqual: true }; }
        return null;
    };
}

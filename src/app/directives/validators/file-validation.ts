import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[appRequireFile]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: FileValidator, multi: true },
    ]
})
export class FileValidator implements Validator {
    static validate(c: FormControl): { [key: string]: any } {
        let type = '';
        if (c.value) {
            type = c.value[0].type.split('/')[1];
        }
        // tslint:disable-next-line:max-line-length
        return c.value == null || c.value.length === 0 || (type !== 'jpeg' && type !== 'png' && type !== 'jpg') ? { 'required': true } : null;
    }
    static validateExcelfile(c: FormControl): { [key: string]: any } {
        let type = '';
        const allowedType = ['xlsx', 'xls'];
        if (c.value) {
            type = c.value[0].name.substr((c.value[0].name.lastIndexOf('.') + 1)).toLowerCase();
        }
        return c.value == null || c.value.length === 0 || allowedType.indexOf(type) === -1 ? { 'required': true } : null;
    }
    static validateZipfile(c: FormControl): { [key: string]: any } {
        let type = '';
        const allowedType = 'zip';
        if (c.value) {
            type = c.value[0].name.substr((c.value[0].name.lastIndexOf('.') + 1)).toLowerCase();
            console.log(type);
        }
        return c.value == null || c.value.length === 0 || (type !== allowedType) ? { 'required': true } : null;
    }
    validate(c: FormControl): { [key: string]: any } {
        return FileValidator.validate(c);
    }
    validateExcelfile(c: FormControl): { [key: string]: any } {
        return FileValidator.validateExcelfile(c);
    }
    validateZipfile(c: FormControl): { [key: string]: any } {
        return FileValidator.validate(c);
    }
}

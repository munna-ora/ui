import {AsyncValidatorFn , ValidationErrors, AbstractControl} from '@angular/forms';
import { AuthService } from '../../services/apis/auth.service';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export function ValidateEmailNotTaken(authSrv: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return authSrv.checkEmailExist(control.value).map( res => {
      console.log(res);
          if (res.responseCode !== '200') {
          return { emailTaken: true };
        }
        return null;
    }).catch(res => of({emailTaken: true }));
  };
}

import {AsyncValidatorFn , ValidationErrors, AbstractControl} from '@angular/forms';
import { AuthService } from '../../services/apis/auth.service';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export function ValidateMobileNotTaken(authSrv: AuthService, countryField: string): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const countryCode = control.root.get(countryField);
    const mobile = control;
    if (countryCode.value !== '' && countryCode.value !== null && mobile.value !== '' && mobile.value !== null) {
      const requestData = {
        countryId : countryCode.value,
        mobile : mobile.value,
      };
      return authSrv.checkMobileExist(requestData).map( res => {
        if (res.responseCode !== '200') {
          return { mobileTaken: true };
        }
        return null;
      }).catch(res => of({mobileTaken: true }));
    }
    return of(null);
  };
}

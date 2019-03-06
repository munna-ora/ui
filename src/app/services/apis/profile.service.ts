import { Injectable } from '@angular/core';
import { AppConst } from '../../app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpClient: HttpClient
  ) {

    }
   /**
	 * Method used to get User Profile Details
	 * @param {any} requestParam
	 * @returns {Observable<any>}
	 * @memberof ProfileService
	 */
  getUserDetails(requestParam: any): Observable<any> {
    const request = {
      'url': AppConst.PROFILE_API_BASE_URL + '/check-token',
      'params' : "requestParam"
    };
    return this.httpClient.get<any>(request.url);
  }

  /**
	 * Method used to get all the Language list
	 *
	 * @returns {Observable<any>}
	 * @memberof AuthService
	 */
  getLanguageList(): Observable<any> {
    const request = {
      'url': AppConst.PROFILE_API_BASE_URL + '/fetch-languages'
    };
    return this.httpClient.get<any>(request.url);
  }

  /**
	 * Method used to get all the Domain list
	 *
	 * @returns {Observable<any>}
	 * @memberof AuthService
	 */
  getDomainList(): Observable<any> {
    const request = {
      'url': AppConst.PROFILE_API_BASE_URL + '/fetch-domains'
    };
    return this.httpClient.get<any>(request.url);
  }

   /**
	 * Method used to get all the Domain list
	 *
	 * @returns {Observable<any>}
	 * @memberof AuthService
	 */
  getInterestList(): Observable<any> {
    const request = {
      'url': AppConst.PROFILE_API_BASE_URL + '/fetch-interests'
    };
    return this.httpClient.get<any>(request.url);
  }

}

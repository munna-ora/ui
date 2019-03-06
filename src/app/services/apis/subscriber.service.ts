import { Injectable } from '@angular/core';
import { AppConst } from '../../app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(
    private httpClient: HttpClient
  ) {

    }
     /**
	 * Method used to add subscriber
	 * @param {any} requestParam
	 * @returns {Observable<any>}
	 * @memberof SubscriberService
	 */
  addSubscriber(requestParam: any): Observable<any> {
    // console.log('here');
    const request = {
      'url': AppConst.SUBSCRIBER_API_BASE_URL + '/add-subscriber',
      'params' : requestParam
    };
    return this.httpClient.post<any>(request.url, request.params);
  }
}

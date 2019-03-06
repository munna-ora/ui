import { Injectable } from '@angular/core';
import { AppConst } from '../../app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private httpClient: HttpClient
  ) {

    }
   /**
	 * Method used to get Booking list
	 * @param {any} requestParam
	 * @returns {Observable<any>}
	 * @memberof BookingService
	 */
  getBookingList(requestParam: any): Observable<any> {
    const request = {
      'url': AppConst.PROPERTY_ADD_API_BASE_URL + '/get-user-bookings',
      'params' : requestParam
    };
    return this.httpClient.post<any>(request.url, {});
  }

}

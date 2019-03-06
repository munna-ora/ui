import { Injectable } from '@angular/core';
import { AppConst } from '../../app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(
    private httpClient: HttpClient
  ) {

  }
  getAirport(requestParam: any): Observable<any> {
    const request = {
        'url': AppConst.FLIGHT_API_BASE_URL + '/search-airport-details'
     };
     return this.httpClient.get<any>(request.url, {params: requestParam}) .map(res => {
      return res.responseBody;
  });
  }

  getFlightList(requestParam: any): Observable<any> {
    console.log();
    let flightSearchUrl = '';
    if (requestParam.tripType === 'O') {
      flightSearchUrl = 'fetch-one-way-flights';
    } else if (requestParam.tripType === 'R') {
      flightSearchUrl = 'fetch-round-trip-flights';
    } else if (requestParam.tripType === 'M') {
      flightSearchUrl =  'fetch-multi-city-flights';
    } else {}
    const request = {
        // 'url':  'assets/static-data/searchOneWayResponseSwagger.json'
       // 'url':  'assets/static-data/searchRoundResponseSwagger.json'
        'url': AppConst.FLIGHT_API_BASE_URL + '/' + flightSearchUrl
     };
     return this.httpClient.post<any>(request.url, requestParam);
  }
}

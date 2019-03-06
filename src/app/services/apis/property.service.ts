import { Injectable } from '@angular/core';
import { AppConst } from '../../app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private httpClient: HttpClient
  ) {

    }
   /**
	 * Method used to get property types
	 * @param {any} requestParam
	 * @returns {Observable<any>}
	 * @memberof PropertyService
	 */
  getPropertyTypes(requestParam: any): Observable<any> {
    // console.log('here');
    const request = {
      'url': AppConst.PROPERTY_ADD_API_BASE_URL + '/fetch-property-types',
      'params' : requestParam
    };
    return this.httpClient.post<any>(request.url, request.params);
  }
 /**
	 * Method used to get property types
	 * @param {any} requestParam
	 * @returns {Observable<any>}
	 * @memberof PropertyService
	 */
  searchProperties(requestParam: any): Observable<any> {
    // console.log('here');
    const request = {
      'url': AppConst.PROPERTY_API_BASE_URL + '/fetch-properties',
      'params' : requestParam
    };
    return this.httpClient.post<any>(request.url, request.params);
    // const request = {
    //    'url':  'assets/static-data/property-list.json'
    // };
    // return this.httpClient.get<any>(request.url, {params: requestParam});
  }
  getPropertyDetails(requestParam: any) {
    const request = {
      'url': AppConst.PROPERTY_API_BASE_URL + '/fetch-property-details',
      'params' : requestParam
    };
    return this.httpClient.post<any>(request.url, request.params);
  }
  getPropertyPriceDetails(requestParam: any) {
    const request = {
      'url': AppConst.PROPERTY_API_BASE_URL + '/fetch-price-details',
      'params' : requestParam
    };
    return this.httpClient.post<any>(request.url, request.params);
  }

  getMasterRatingsList(requestParam: any): Observable<any> {
    const request = {
        'url': AppConst.PROPERTY_API_BASE_URL + '/ratings'
     };
     return this.httpClient.get<any>(request.url, {params: requestParam});
  }

  getMasterBudgetsList(requestParam: any): Observable<any> {
    const request = {
        'url': AppConst.PROPERTY_API_BASE_URL + '/budgets'
     };
     return this.httpClient.get<any>(request.url, {params: requestParam});
  }

  getMasterAmenitiesList(requestParam: any): Observable<any> {
    const request = {
        'url': AppConst.PROPERTY_ADD_API_BASE_URL + '/fetch-amenities-for-filter'
     };
     return this.httpClient.post<any>(request.url, {params: requestParam});
  }

  getPropertyByType(params: any): Observable<any> {
    const request = {
      'url': AppConst.PROPERTY_API_BASE_URL + '/fetch-properties-by-type',
      'params' : params
    };
    return this.httpClient.get<any>(request.url, {params: request.params});
  }

  getHostPropertyList(): Observable<any> {
    // console.log('here');
    const request = {
      'url': AppConst.PROPERTY_ADD_API_BASE_URL + '/list-property',
      'params' : {}
    };
    return this.httpClient.post<any>(request.url, request.params);
  }

  calculatePrice(params: any): Observable<any> {
    const request = {
      'url': AppConst.PROPERTY_API_BASE_URL + '/price-calculatory',
    };
    return this.httpClient.post<any>(request.url, params);
  }

  getOfferList(params: any): Observable<any> {
    const request = {
      'url': AppConst.PROPERTY_API_BASE_URL + '/fetch-offer',
    };
    return this.httpClient.post<any>(request.url, params);
  }

  addProperty(params: any): Observable<any> {
    const request = {
      'url': AppConst.PROPERTY_ADD_API_BASE_URL + '/add-property'
    };
    return this.httpClient.post<any>(request.url, params);
  }
  getSpaceRuleList(params: any) {
    const request = {
      'url': AppConst.PROPERTY_ADD_API_BASE_URL + '/fetch-space-rule'
    };
    return this.httpClient.post<any>(request.url, params);
  }
  getSpecialExperienceList(params: any) {
    const request = {
      'url': AppConst.PROPERTY_ADD_API_BASE_URL + '/fetch-special-experience'
    };
    return this.httpClient.post<any>(request.url, params);
  }
  getStayTypeList(params: any) {
    const request = {
      'url': AppConst.PROPERTY_ADD_API_BASE_URL + '/fetch-stay-types'
    };
    return this.httpClient.post<any>(request.url, params);
  }
  // Fetch all purpose list for contact form in dashboard
  getContactPurposeList(): Observable<any> {
    const request = {
      'url': AppConst.PROPERTY_ADD_API_BASE_URL + '/fetch-contact-purpose',
      'params' : {}
    };
    return this.httpClient.get<any>(request.url, request.params);
  }

  // Contact Ora email
  contactOraDetails(params: any): Observable<any> {
    const request = {
      'url': AppConst.PROPERTY_ADD_API_BASE_URL + '/contact-ora'
    };
    return this.httpClient.post<any>(request.url, params);
  }

  addBookmark(params: any): Observable<any> {
    const request = {
      'url': AppConst.PROPERTY_API_BASE_URL + '/add-bookmark'
    };
    return this.httpClient.post<any>(request.url, params);
  }

  fetchToiletry(params: any): Observable<any> {
    const request = {
      'url': AppConst.PROPERTY_API_BASE_URL + '/fetch-toiletry'
    };
    return this.httpClient.post<any>(request.url, params);
  }

}

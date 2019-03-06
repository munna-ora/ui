import { Injectable } from '@angular/core';
import { AppConst } from '../../app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(
    private httpClient: HttpClient
  ) {

    }
     /**
	 * Method used to get list of testimonial
	 * @returns {Observable<any>}
	 * @memberof TestimonialService
	 */
  getTestimonial(): Observable<any> {
    const request = {
     // 'url':  'assets/static-data/fetch-testimonials.json'
      'url': AppConst.TESTIMONIAL_API_BASE_URL + '/fetch-testimonials'
    };
    return this.httpClient.get<any>(request.url);
  }
}

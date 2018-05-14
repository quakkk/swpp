import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Rating } from './rating';

@Injectable()
export class RatingService {
  private latestUrl = '/api/post/latest'; 
  private latestUrl = '/api/post/latest';
  private myRatingUrl = '/api/user/rating'
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  get_latest_ratings(): Promise<Rating[]> {

	  return this.http.get(this.latestUrl)
				.toPromise()
				.then(response => response.json() as Rating[])
				.catch(this.handleError);
  }

  getMyRatings(): Promise<Rating[]> {
    return this.http.get(this.myRatingUrl)
      .toPromise()
      .then(response => response.json() as Rating[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
}

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Post } from './post';

@Injectable()
export class PostService {
  private topUrl = '/api/post/top'; 
  private topUrl = '/api/post/top';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  get_top_posts(): Promise<Post[]> {
	return this.http.get(this.topUrl)
		.toPromise()
		.then(response => response.json() as Post[])
		.catch(this.handleError);
  }

  get_recommended_posts(category_id: string): Promise<Post[]> {
  	const recUrl = `/api/post/top/${category_id}`;
  	return this.http.get(recUrl)
		.toPromise()
		.then(response => response.json() as Post[])
		.catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
}

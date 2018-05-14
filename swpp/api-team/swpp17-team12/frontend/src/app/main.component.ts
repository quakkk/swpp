import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";

import {UserService} from "./model/user.service";
import {User} from "./model/user";
import {Post} from "./post";
import {PostService} from "./post.service";
import {Rating} from "./rating";
import {RatingService} from "./rating.service";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit{
	constructor(
		private router: Router,
    		private postService: PostService,
    		private ratingService: RatingService,
    		private userService: UserService) { }

	ngOnInit(): void{
		this.get_latest_ratings();
		this.get_top_posts();
	}
	
	latest_ratings: Rating[];
	top_posts: Post[];

	get_latest_ratings(): void{
		this.ratingService.get_latest_ratings().then(latest_ratings => this.latest_ratings = latest_ratings);
	}

	get_top_posts(): void{
		this.postService.get_top_posts().then(top_posts => this.top_posts = top_posts);
	}

}
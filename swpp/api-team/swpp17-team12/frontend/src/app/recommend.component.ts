import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {UserService} from "./model/user.service";
import {User} from "./model/user";
import {Post} from "./post";
import {PostService} from "./post.service";

@Component({
  selector: 'recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
})

export class RecommendComponent implements OnInit {
	constructor(
		private router: Router,
    		private postService: PostService,
    		private userService: UserService) { }

	ngOnInit(): void {
		this.get_top_posts();
	}

	posts: Post[];

	onSelect(): void{
		var category = (<HTMLInputElement>document.getElementById("selectCategory")).value;
		if(category == "All"){
			this.get_top_posts();
		}else{
			this.postService.get_recommended_posts(category)
        		.then(posts => this.posts = posts);	
		}
	}

	get_top_posts(): void{
		this.postService.get_top_posts().then(top_posts => this.posts = top_posts);
	}
	
}		
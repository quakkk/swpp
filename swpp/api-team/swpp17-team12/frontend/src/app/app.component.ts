import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "./model/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router : Router,
    private userService : UserService) {}

  ngOnInit(): void {}

  title = 'AdfreeReview';

  signout() {
    this.userService
      .signout()
      .subscribe(response => {
        alert("You are successfully signed out!");
        this.router.navigate(['/main']);
      }, (err) => {
        alert("HttpResponse: " + err);
      });
  }
}

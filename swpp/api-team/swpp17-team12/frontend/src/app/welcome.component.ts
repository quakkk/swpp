import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";

import {UserService} from "./model/user.service";


@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  signin_info: any = {};
  signup_info: any = {};
  constructor(
    private router : Router,
    private userService : UserService) {}

  ngOnInit(): void {}

  signin() {
    this.userService
      .signin(this.signin_info.username, this.signin_info.password)
      .subscribe(response => {
        alert("You are successfully signed in!");
        this.router.navigate(['/main']);
      }, (err) => {
        if (err === 'Unauthorized') {
          alert('Incorrect username or password.');
        }
        else {
          alert("Http Response: " + err);
        }
      });
  }

  signup() {
    this.userService
      .signup(this.signup_info.username, this.signup_info.email, this.signup_info.password)
      .subscribe(response => {
        alert("You are successfully signed up! Welcome. Please login.");
      }, (err) => {
        alert("HttpResponse: " + err);
      });
  }
}

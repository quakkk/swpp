import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {HttpModule, XSRFStrategy} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {CookieXSRFStrategy} from "@angular/http";

import { AppComponent } from './app.component';
import {WelcomeComponent} from "./welcome.component";
import {MainComponent} from "./main.component";
import {MypageComponent} from "./mypage.component";
import {RecommendComponent} from "./recommend.component";
import {UserService} from "./model/user.service";
import {PostService} from "./post.service";
import {RatingService} from "./rating.service";

// For Testing
import { APP_BASE_HREF } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MainComponent,
    MypageComponent,
    RecommendComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    UserService,
    PostService,
    RatingService,
    {provide: APP_BASE_HREF, useValue : '/'},
    { provide: XSRFStrategy, useFactory: cookieStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function cookieStrategy() {
  return new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {WelcomeComponent} from "./welcome.component";
import {MainComponent} from "./main.component";
import {MypageComponent} from "./mypage.component";
import {RecommendComponent} from "./recommend.component";

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'main', component: MainComponent },
  { path: 'mypage', component: MypageComponent },
  { path: 'recommend', component: RecommendComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

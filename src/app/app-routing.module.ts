import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {authGuard} from "./auth.guard";

const routes: Routes = [
  {path: "home",component: HomeComponent,canActivate:[authGuard]},//user cannot go home page without log in action
  {path: "welcome",component: WelcomeComponent},
  {path: "",redirectTo:"welcome",pathMatch: "full"},
  {path: "**",redirectTo:"welcome",pathMatch: "full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

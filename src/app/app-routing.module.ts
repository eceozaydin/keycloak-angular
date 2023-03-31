import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {AuthGuard} from "./services/auth.guard";
import {AddEmployeeComponent} from "./components/add-employee/add-employee.component";

const routes: Routes = [
  {path: "home",component: HomeComponent,canActivate:[AuthGuard]},//user cannot go home page without log in action
  { path: 'add-employee', component: AddEmployeeComponent},
  {path: "welcome",component: WelcomeComponent},
  {path: "",redirectTo:"welcome",pathMatch: "full"},
  {path: "**",redirectTo:"welcome",pathMatch: "full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

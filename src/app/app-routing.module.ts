import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {AuthGuard} from "./services/auth.guard";
import {AddEmployeeComponent} from "./components/add-employee/add-employee.component";
import {NavbarComponent} from "./components/navbar/navbar.component";

const routes: Routes = [
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    //canActivate: [AuthGuard],
    //data: { roles: ['admin'] },
  },

  {
    path: "home",
    component: HomeComponent,
    canActivate:[AuthGuard]},//user cannot go home page without log in action

  {
    path: "welcome",
    component: WelcomeComponent
  },
  {
    path: "",
    redirectTo:"welcome",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo:"welcome",
    pathMatch: "full"
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
/*
const routes: Routes = [
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: "",
    redirectTo:"welcome",
    pathMatch: "full"},
  {
    path: "**",
    redirectTo:"welcome",
    pathMatch: "full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}*/

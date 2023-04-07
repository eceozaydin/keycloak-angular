import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {OAuthService} from "angular-oauth2-oidc";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeGuard implements CanActivate {
  constructor(
    private oauthService: OAuthService,
    private jwtHelper: JwtHelperService

  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isAdmin()){
      return true
    }
    else{
      return false;
    }
  }

  isAdmin(): boolean {
    const decodedAccessToken = this.oauthService.getAccessToken();
    const payload = this.jwtHelper.decodeToken(decodedAccessToken);
    return !!payload && payload.realm_access.roles.includes('admin');
  }

  trial(){
    return "trial";
  }
}

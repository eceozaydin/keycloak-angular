import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {OAuthService} from "angular-oauth2-oidc";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeGuard implements CanActivate {
  constructor(
    private oauthService: OAuthService,
    private jwtHelper: JwtHelperService,

    private router: Router,

  ) {
  }

  /**
   * This method is used to check if the user is logged in and has a valid access token.
   * Also,it checks if the user is an admin.
   * @param route
   * @param state
   * @returns boolean | UrlTree - true if the user is logged in and has a valid access token and is an admin, otherwise it redirects to the welcome page.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken() && this.isAdmin()) {
      return true;
    } else {
      return this.router.parseUrl('welcome');
    }
  }

  /**
   * This method is used to check if the user is an admin.
   */
  isAdmin(): boolean {
    const decodedAccessToken = this.oauthService.getAccessToken();
    const payload = this.jwtHelper.decodeToken(decodedAccessToken);
    return !!payload && payload.realm_access.roles.includes('admin');
  }


}

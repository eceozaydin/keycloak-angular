import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


import {OAuthService} from "angular-oauth2-oidc";
/*
//route guard is way to protect  resource/page
export const authGuard = () => {
  const authService = inject(OAuthService);
  const router = inject(Router);
  if(authService.hasValidIdToken() && authService.hasValidAccessToken()){
    return true;
  }else{
    return  router.parseUrl("welcome");
  }

};
*/
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private oauthService: OAuthService,
              private router: Router,
              private jwtHelper:JwtHelperService
              ) { }

  canActivate(): boolean | import('@angular/router').UrlTree {
    if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()) {
      return true;
    } else {
      return this.router.parseUrl('welcome');
    }
  }
}


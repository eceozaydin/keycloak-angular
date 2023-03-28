import {inject, Injectable} from '@angular/core';
import { Router} from '@angular/router';

import {OAuthService} from "angular-oauth2-oidc";

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

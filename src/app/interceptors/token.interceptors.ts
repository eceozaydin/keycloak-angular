import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OAuthService} from "angular-oauth2-oidc";
import KeycloakAuthorization from "keycloak-js/dist/keycloak-authz";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  preferred_username="";
  constructor(
    private oauthService: OAuthService,
    private http: HttpClient
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.oauthService.getAccessToken();
    const preferredUsername = this.getUsername();

    // token varsa header'a ekle
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          Username: `${preferredUsername}`
        }
      });

    }

    return next.handle(request);
  }


  getUsername(){
    const userClaims: any = this.oauthService.getIdentityClaims();
    if (userClaims && userClaims.preferred_username) {
      this.preferred_username = userClaims.preferred_username;
    } else {
      // Default value or error handling logic
      this.preferred_username = 'N/A';
    }
    return this.preferred_username;
  }


}

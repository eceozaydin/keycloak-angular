import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OAuthService} from "angular-oauth2-oidc";
import KeycloakAuthorization from "keycloak-js/dist/keycloak-authz";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private oauthService: OAuthService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.oauthService.getAccessToken();

   //const token = localStorage.getItem('access_token');

    // token varsa header'a ekle
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`

        }
      });

    }

    return next.handle(request);
  }
}

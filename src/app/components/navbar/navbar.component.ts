import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../../sso-config";
import {JwksValidationHandler} from "angular-oauth2-oidc-jwks";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthGuard} from "../../services/auth.guard";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{


  name:string="";//user name
  constructor(
    private oauthService: OAuthService,
    private jwtHelper: JwtHelperService,
    private  authGuard: AuthGuard
  ) {
  }
  ngOnInit(): void {
    // configure single sign-on
    this.configureSingleSignOn();

    // get the user's identity claims
    const userClaims: any = this.oauthService.getIdentityClaims();

    // check if the name property exists and set it to this.name
    if (userClaims && userClaims.name) {
      this.name = userClaims.name;
    }
  }

  configureSingleSignOn(){
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler=new JwksValidationHandler();//npm i angular-oauth2-oidc-jwks --save
    /*this.oauthService.loadDiscoveryDocumentAndTryLogin().then(r =>
      {
        console.log("Authantication successful")}
    );*/
  }

  login(){
    this.oauthService.initCodeFlow();
  }

  logout(){
    this.oauthService.logOut();
  }
  //get identity claim of the user

  get token(){
    let claims: any= this.oauthService.getIdentityClaims();
    return claims ? claims:null;
  }

  isAdmin(){
    return this.authGuard.isAdmin();
  }


}

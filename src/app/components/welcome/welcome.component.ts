import { Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../../sso-config";
import {JwksValidationHandler} from "angular-oauth2-oidc-jwks";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{
  name:string="";//user name
  constructor(private oauthService: OAuthService) {
  }
  // @ts-ignore
  ngOnInit(): void {
    // configure single sign-on
    this.configureSingleSignOn();

    // get the user's identity claims

  }


  configureSingleSignOn(){
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler=new JwksValidationHandler();//npm i angular-oauth2-oidc-jwks --save
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(r =>
      {

        const userClaims: any = this.oauthService.getIdentityClaims();

        // check if the name property exists and set it to this.name
        if (userClaims && userClaims.name) {
          this.name = userClaims.name;
        }
      }
    );
  }




}

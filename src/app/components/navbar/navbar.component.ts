import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../../sso-config";
import {JwksValidationHandler} from "angular-oauth2-oidc-jwks";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{


  name:string="";//user name
  constructor(private oauthService: OAuthService) {
  }
  ngOnInit(): void {
    //any time when page load this method will configure
    this.configureSingleSignOn();
    const userClaims: any =this.oauthService.getIdentityClaims();//any means that variable could be any type
    this.name=userClaims.name ? userClaims.name : "";
  }

  configureSingleSignOn(){
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler=new JwksValidationHandler();//npm i angular-oauth2-oidc-jwks --save
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(r =>
      console.log(`Authentication successful`)
    );
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



}

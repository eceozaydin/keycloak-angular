import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../../sso-config";
import {JwksValidationHandler} from "angular-oauth2-oidc-jwks";
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(
    private oauthService: OAuthService,
    private jwtHelper: JwtHelperService
    ) {
  }
  token:any;
  name: string="";
  userInfo: any;
  ngOnInit(): void {
    this.configureSingleSignOn();
    const userClaims: any =this.oauthService.getIdentityClaims();//any means that variable could be any type
    this.name=userClaims.name ? userClaims.name : "";
  }

  configureSingleSignOn(){
    const ece = this.oauthService.getAccessToken();
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler=new JwksValidationHandler();//npm i angular-oauth2-oidc-jwks --save
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(r =>
      console.log(`Authentication successful`)
    );
  }

  getUserInfo() {
    this.userInfo = this.oauthService.getIdentityClaims();
    //console.log(this.userInfo); // You can log it to the console or display it in the template
  }
  getAccessToken(){
    this.token=this.oauthService.getAccessToken();
    const token = document.getElementById('token');
    //console.log(this.token);
  }


  isAdmin(): boolean {
    const decodedAccessToken = this.oauthService.getAccessToken();
    const payload = this.jwtHelper.decodeToken(decodedAccessToken);
    return !!payload && payload.realm_access.roles.includes('admin');
  }
}

import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "../../sso-config";
import {JwksValidationHandler} from "angular-oauth2-oidc-jwks";
import { JwtHelperService } from '@auth0/angular-jwt';
import {AuthGuard} from "../../services/auth.guard";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(
    private oauthService: OAuthService,
    private jwtHelper: JwtHelperService,
    private authGuard: AuthGuard,
    ) {
  }
  token:any;
  name ="";

  userInfo: any;
  ngOnInit(): void {
    this.configureSingleSignOn();
    const userClaims: any = this.oauthService.getIdentityClaims();
    this.name = userClaims.name || '';
  }

  configureSingleSignOn(){
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
    //console.log(this.token);
  }

  isAdmin(){
    return this.authGuard.isAdmin();
  }





}

export const environment = {
  production:false,
  keycloak:{
    issuer:"http://localhost:8180/realms/angular",
    //issuer:"http://localhost:8080/auth/realms/MySSOApplication",
    redirectUri: "http://localhost:4200/*",
    clientId:"sso-app"


  }

};

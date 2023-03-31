export const environment = {
  production:false,
  keycloak:{
    issuer:"http://localhost:8180/realms/angular",
    redirectUri: "http://localhost:4200/*",
    clientId:"sso-app",
    //scope:"openid profile offline_access",

  }

};

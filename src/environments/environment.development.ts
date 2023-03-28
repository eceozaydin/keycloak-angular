export const environment = {
  production:false,
  keycloak:{
    issuer:"http://localhost:8080/auth/realms/MySSOApplication",
    redirectUri: "http://localhost:4200/",
    clientId:"sso-app",
    scope:"openid profile email offline_access",


  }

};

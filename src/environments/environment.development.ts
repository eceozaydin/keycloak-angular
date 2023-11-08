export const environment = {
  production:false,
  keycloak:{
    issuer:"http://127.0.0.1:8080/realms/angular",
    redirectUri: "http://localhost:4200",
    clientId:"sso-app",
    scope:"openid profile offline_access",
    realm: "angular"
  }

};

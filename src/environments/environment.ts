export const environment = {
  production:false,
  keycloak:{
    issuer:"http://10.34.79.80:8080/realms/angular",
    redirectUri: "http://localhost:4200",
    clientId:"sso-app",
    scope:"openid profile offline_access",
    realm: "angular"
  }

};

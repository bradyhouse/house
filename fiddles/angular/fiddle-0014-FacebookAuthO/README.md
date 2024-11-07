fiddle-0014-FacebookAuthO
======


### Title

fiddle-0014-FacebookAuthO


### Creation Date

11-26-17


### Location

Chicago, IL


### Issue

[Issue #204](https://github.com/bradyhouse/house/issues/204)


### Description

Fiddle exploring how to authenticate using auth0 and facebook. It is based on the auth0 `real world 
angular tutorial series` => [Auth0 Real World Angular Series Part 1](https://auth0.com/blog/real-world-angular-series-part-1/). 
It integrates the following libraries:

    *   express 
    *   body-parser
    *   express-jwt
    *   jwks-rsa 
    *   method-override 
    *   mongoose
    *   cors
    *   auth0-js
    

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.


### Pre-Requisites

1.  Create an account and setup a client on Auth0.com - see [Auth0 Real World Angular Series Part 1](https://auth0.com/blog/real-world-angular-series-part-1/)
2.  Create an account and setup a mongoDb on mlab - see [Auth0 Real World Angular Series Part 1](https://auth0.com/blog/real-world-angular-series-part-1/)
3.  Install node v7.9.0 (npm v4.2.0)


### Use Cases

#### Setup

Run `npm install` from the root directory.

#### Server Setup

Open the `server/config.js` file and make the following updates:

  1.  Set the `AUTHO_DOMAIN` variable based on your [Auth0 Client](https://manage.auth0.com/#/clients) settings
  2.  Set the `MONGO_DB_CLOUD_URI` variable based on your [mlab](https://mlab.com/home) settings

#### Auth Service Setup

Open the `src/app/auth/auth.config.ts` file and make the following updates:

  1.  Set the `CLIENT_ID` variable based on your [Auth0 Client](https://manage.auth0.com/#/clients) settings
  2.  Set the `CLIENT_DOMAIN` variable based on your [Auth0 Client](https://manage.auth0.com/#/clients) settings

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


### Published Version Link

N/A


### Tags

node, angular2+, express, body-parser, express-jwt, jwks-rsa, method-override, mongoose, cors, auth0-js

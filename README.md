# FuseBackend

This MVP project was developed using Angular + Fuse Material Design Admin Template. 

***

## Key Technologies:

- Angular v7.0.3

- Fuse material design admin template engine

- Node.js v10.14.1

- NPM v6.4.1

## Prerequisities on Ubuntu 16.04

1) Install Node.js v10.x and Npm v6.x (reference: How to install the latest versions of NodeJS and NPM[https://askubuntu.com/questions/594656/how-to-install-the-latest-versions-of-nodejs-and-npm])

    `$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`

    `$ sudo apt-get install -y nodejs`

2) Install angular cli globally using NPM

    `$ npm install -g @angular/cli@7.0.3`

## Run the application locally

1) To consume your backend APIs, change the domain in `src/environments/environment.ts`.

2) Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

***

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

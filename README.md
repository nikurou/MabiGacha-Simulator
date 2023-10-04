# MabinogiGacha

Accurately simulates a lootbox for Nexon's popular MMORPG title, Mabinogi. Supports features such as multi-gaching and continous gaching until user specified item is found. 

# R1.0.1 Changelog
 - Upgraded Angular/Angular CLI/Angular Material from Version 10 to Version 14.
 - Updated TypeScript and other dependencies.
 - Re-implemented all the gacha logic to be handled locally rather than by the backend server.js
    - server.js will now only serve the gachapon's data but not handle the calculations
 - Fixed long standing bug where Loot Table would not update dynamically unless user refreshed. 
 - Updated the data structure that is stored to user's cache to be a single JSON object. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm start` for the Express server. Server will be hosted on `http://localhost:5000/`

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
"# MabiGacha-Simular" 

# MabinogiGacha

Simulates a lootbox for Nexon's popular MMORPG title, Mabinogi. Supports features such as multi-gaching and continous gaching until user specified item is found.

# R1.0.1 Dev Changelog

- Upgraded Angular/Angular CLI/Angular Material from Version 10 to Version 14.
- Updated TypeScript and other dependencies.
- Re-implemented all the gacha logic to be handled locally rather than by the backend server.js
  - server.js will now only serve the gachapon's data but not handle the calculations
  - Even if BE servers aren't up, functionality remains for the test box.
- Fixed long standing bug where Loot Table would not update dynamically unless user refreshed.
- Restructured localStorage cache to an object to hold the history of items.
- Slow mode can now be switched to instantaneous mode in the midle of gaching in slow mode.
- Updated the data structure that is stored to user's cache to be a single JSON object.
- Restructured data returned by the backend and refactored FE logic to accomodate
  - new endpoints created
- Added visual support for dye colors in console tab.

## Running the Project on Your Local

Clone this Repository and navigate to the project directory in terminal

Run `npm install` to install all the necessary packages.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm start` for the Express server. Server will be hosted on `http://localhost:5000/` Changes to the backend logic will require a manual server restart. (todo: nodemon)

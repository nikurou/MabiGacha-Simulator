import { Component, OnInit } from '@angular/core';

import { Gachapon } from './gacha-logic';

import { userSelectedOptions } from './options/options.component';

declare const gachaLogic: any;

interface gachaCacheObject {
  totalNX: number;
  numGacha: number;
  lootList: string[];
}

export interface gachaLoot {
  [itemName: string]: {
    name: string;
    quantity: number;
  };
}

@Component({
  selector: 'app-gacha-ui',
  templateUrl: './gacha-ui.component.html',
  styleUrls: ['./gacha-ui.component.css'],
})
export class GachaUIComponent implements OnInit {
  currentGachaObject: Gachapon;
  selectedImage: string;
  selectedGachapon: string; //Sent to options component
  selectedList: string[]; //Sent to options component
  disable: string; //Determines if the Gach button is disabled
  numTotalGacha: number;
  totalNX: number;
  lootHistory: gachaLoot; // history of all gach'd items

  serverStringURL: string; //Receive from child component
  slowModeStatus: boolean; // Received from console.component.ts
  optionsDisable: string; //Receieved from options.component.ts
  selectedOptions: userSelectedOptions; // recieved from options.component.ts
  gachas: Gachapon[];

  public resultGach: string[]; //Holds all the output from server...Sent to Console
  public currResultGach: string[]; //Holds the output from just the current gach

  constructor() {
    this.disable = 'false';
    this.optionsDisable = 'false';
    this.resultGach = [];
    this.currResultGach = [];
  }

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('gachaCache') === null) {
      localStorage.setItem(
        'gachaCache',
        JSON.stringify({
          totalNX: 0,
          numGacha: 0,
          lootList: {},
        })
      );
    }

    let { totalNX, numGacha, lootList } = JSON.parse(
      localStorage?.getItem('gachaCache')
    );
    this.totalNX = totalNX;
    this.numTotalGacha = numGacha;
    this.lootHistory = lootList;

    this.gachas = [
      await Gachapon.Create(
        'BLEUGENNE by Bleugenne Cosmetics',
        'assets/img/bleugenne-by-bleugenne-cosmetics-box.png'
      ),
      await Gachapon.Create(
        'Example_Box',
        'assets/img/mabinogi-secret-garden-box-webicon.png',
        true
      ),
      await Gachapon.Create(
        'Secret Garden Box',
        'assets/img/mabinogi-secret-garden-box-webicon.png'
      ),
      await Gachapon.Create(
        'Crow Feather Box',
        'assets/img/mabinogi-crow-feather-box.png'
      ),
      await Gachapon.Create(
        'Forest Ranger Bag Gachapon',
        'assets/img/forest-guardian_basic.png'
      ),
      await Gachapon.Create(
        'Erinn Beauty Box',
        'assets/img/mabinogi-erinn-beauty-box-webicon.png'
      ),
      await Gachapon.Create(
        'Modern School Uniform Box',
        'assets/img/mabinogi-modern-school-uniform-box-webicon.png'
      ),
    ];

    this.currentGachaObject = this.gachas[0];
    this.selectedGachapon = this.gachas[0].gachaName;
    this.selectedImage = this.gachas[0].gachaURL;
    this.selectedList = this.gachas[0].gachaList;
    this.selectedItem(this.gachas[0]);
  }

  recieveOptionsFromChild($event) {
    this.selectedOptions = $event;
  }

  recieveDisabilityFromChild($event) {
    this.optionsDisable = $event;
  }

  recieveSlowModeStatus($event) {
    this.slowModeStatus = $event;
  }

  /* Upon selection of new gachapon update all the properties*/
  async selectedItem(gacha: Gachapon) {
    this.currentGachaObject = gacha;
    await gacha.fetchDataForGachapon();
    this.selectedGachapon = gacha.gachaName;
    this.selectedImage = gacha.gachaURL;
    this.selectedList = gacha.gachaList;
  }

  //Disables the user from gaching per click for 2 seconds
  setTimeOut() {
    //not a built in js function
    this.disable = 'true';
    let time = 2000;
    if (this.slowModeStatus == true) {
      time = this.currResultGach.length * 500; //numItem x 500 ms per gach is the lenght of button disable
    }
    setTimeout(() => {
      this.disable = 'false';
    }, time); //2 dont press if not slow mode, else variable time.
  }

  /**
   * Given the list of parameters, return a list of the items retrieved and handle all the money calculation.
   * @param x <>
   * @param y <>
   * @returns z <>
   */
  handleGetGachaResults = (
    selectedOption: userSelectedOptions['selectedOption'],
    quantity?: number,
    specificItem?: string
  ) => {
    const gachaList = this?.currentGachaObject?.gachaList;

    // Fetch a specific Quantity of Items before Stopping.
    if (selectedOption === 'bulk' && quantity > 0) {
      return this?.currentGachaObject?.getRandomItemsByQuantity(quantity);
    }
    // Keep pulling until the item is retrieved, assuming it exists in the list.
    else if (selectedOption === 'specific') {
      return this?.currentGachaObject?.getRandomlyItemBySpecifics(specificItem);
    }
    return;
  };

  /* Gach from the current gachapon, and send the gacha result to Console Component*/
  gach() {
    this.currResultGach = [];
    const { quantity, selectedOption, specificItem } = this.selectedOptions;

    let local_resultGach = this.handleGetGachaResults(
      selectedOption,
      quantity,
      specificItem
    );

    // If using 'bulk' as an option, use the selected quantity, else just calculate quantity off of the lenght of the results.
    const result_quantity =
      selectedOption === 'bulk' ? quantity : local_resultGach?.length;

    // Handle Increasing the NumTotalGacha Counter
    this.numTotalGacha = Number(this.numTotalGacha) + Number(result_quantity);

    // Handle Incrementing the NX spent counter.
    this.totalNX =
      this.totalNX + Gachapon?.getQuotedPriceForPulls(result_quantity);

    // Set the results and store it in history
    this.currResultGach = local_resultGach;
    this.lootHistory = this.handleMergeLoot(this.lootHistory, local_resultGach);

    localStorage.setItem(
      'gachaCache',
      JSON.stringify({
        totalNX: this.totalNX,
        numGacha: this.numTotalGacha,
        lootList: this.lootHistory,
      })
    );
  }

  // Returns "true" or "false" string depending IFF at least one is paused
  // This method is called by the button itself.
  buttonDisable(localDisable) {
    let disableToReturn: string;

    if (localDisable === 'false' && this.optionsDisable === 'false') {
      disableToReturn = 'false';
    } else {
      disableToReturn = 'true';
    }

    return disableToReturn;
  }

  /**
   * Given the current loot and the incoming loot, combine the two such that it is in a dictionary of type gachaLoot.
   * Any duplicates are quantified.
   *
   * @param lootHistory <gachaLoot>
   * @param local_resultGach <string[]>
   * @returns dictionaryMergedLoot<gachaLoot>
   */
  handleMergeLoot = (
    lootHistory: gachaLoot,
    local_resultGach: any[]
  ): gachaLoot => {
    const dictionaryMergedLoot: gachaLoot = lootHistory;

    // Input the loot history into the dictionary map
    local_resultGach?.forEach((ele) => {
      if (
        dictionaryMergedLoot?.[ele] &&
        dictionaryMergedLoot?.[ele]?.quantity > 0
      ) {
        dictionaryMergedLoot[ele].quantity += 1;
      } else {
        dictionaryMergedLoot[ele] = {
          name: ele,
          quantity: 1,
        };
      }
    });

    return dictionaryMergedLoot;
  };
}

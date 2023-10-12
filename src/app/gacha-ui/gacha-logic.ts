// Contains gaching logic and gachapon items

import { RouteConfigLoadEnd } from '@angular/router';
import axios from 'axios';
import gachaponServices from 'src/services/gachaponServices';
declare const gachaLogic: any;

export class Gachapon {
  public gachaName: string; //Gachapon's Name
  public gachaURL: string; //Image URL
  public gachaList: string[]; //List of items contained in the gachapon
  public gachaPool: string[]; // List of items in the POOL in correlation with their rate, reservoir method population
  public useDummyData: boolean;

  constructor(gachaName: string, gachaURL: string, useDummyData?: boolean) {
    this.gachaName = gachaName;
    this.gachaURL = gachaURL;
    this.useDummyData = useDummyData;
    this.gachaList = !useDummyData
      ? []
      : [
          'Special Forest Ranger Outfit (M)',
          'Special Forest Ranger Outfit (F)',
          'Special Forest Ranger Muffler Outfit (M)',
          'Special Forest Ranger Muffler Outfit (F)',
          'Forest Ranger Two-Handed Sword',
          'Forest Ranger Long Bow',
          'Forest Muffler Wings (Dyeable, Enchantable)',
          'Forest Leaf Muffler Wings (Dyeable, Enchantable)',
          'Forest Ranger Boots (M)',
          'Forest Ranger Boots (F)',
          'Red Forest Muffler Wings (Dyeable)',
          'Gold Forest Muffler Wings (Dyeable)',
          'Black Forest Muffler Wings (Dyeable)',
          'White Forest Muffler Wings (Dyeable)',
          'Red Forest Leaf Muffler Wings (Dyeable)',
          'Gold Forest Leaf Muffler Wings (Dyeable)',
          'Black Forest Leaf Muffler Wings (Dyeable)',
          'White Forest Leaf Muffler Wings (Dyeable)',
          'Forest Ranger Gloves (M)',
          'Forest Ranger Gloves (F)',
          'Forest Ranger Wig and Hat (M)',
          'Forest Ranger Wig and Hat (F)',
          'Red Forest Aura Halo',
          'Gold Forest Aura Halo',
          'Black Forest Aura Halo',
          'White Forest Aura Halo',
          'Natural Forest Wood Halo',
          'Gold Forest Wood Halo',
          'Black Forest Wood Halo',
          'White Forest Wood Halo',
          'Creepy Enchant Scroll Coupon',
          'Eerie Enchant Scroll Coupon',
          'Spooky Enchant Scroll Coupon',
          'Haunted Enchant Scroll Coupon',
          'Brainstorm Enchant Scroll Coupon',
          'Resolution Enchant Scroll Coupon',
          'Forest Ranger Muffler Outfit (M)',
          'Forest Ranger Muffler Outfit (F)',
          'Forest Ranger Outfit (M)',
          'Forest Ranger Outfit (F)',
          'Forest Ranger Wig (M)',
          'Forest Ranger Wig (F)',
          'Forest Ranger Two-Handed Sword Appearance Scroll',
          'Forest Ranger Long Bow Appearance Scroll',
          'Forest Ranger Arrow Bundle (5000 arrows)',
          'Hideous Enchant Scroll Coupon',
          'Chilly Enchant Scroll Coupon',
          'Terror Enchant Scroll Coupon',
          'Urban Legend Enchant Scroll Coupon',
          'Monochromatic Red Pack',
          'Monochromatic Gold Pack',
          'Monochromatic Green Pack',
          'Chainsaw',
          'Nail Bat',
          'Crowbar',
          'Christmas Coat (M)',
          'Christmas Coat (F)',
          'Christmas Boots (M)',
          'Christmas Shoes (F)',
          'Christmas Gloves (M)',
          'Christmas Gloves (F)',
          'Old Saint Nick Outfit (M)',
          'Old Saint Nick Outfit (F)',
          'Old Saint Nick Boots (M)',
          'Old Saint Nick Boots (F)',
          "Santa's Helper Outfit (M)",
          "Santa's Helper Outfit (F)",
          "Santa's Helper Shoes (M)",
          "Santa's Helper Shoes (F)",
          'Homestead Housing White Christmas Tree',
          'Homestead Housing Christmas Tree',
          'Homestead Housing Christmas Wreath',
          'Homestead Housing Rudolph',
          'Homestead Housing Snowflake Flurry',
          "Santa's Helper Hat (M)",
          "Santa's Helper Hat (F)",
          'Avelin Wig (Enchant: Oblivion)',
          'Talvish Wig (Enchant: Oblivion)',
          "Talvish's Armor (Rank 1)",
          "Talvish's Gauntlets (Rank 1)",
          "Talvish's Greaves (Rank 1)",
          "Altam's Armor (Rank 1)",
          "Altam's Greaves (Rank 1)",
          "Altam's Gauntlets (Rank 1)",
          "Avelin's Armor (Rank 1)",
          "Avelin's Greaves (Rank 1)",
          "Avelin's Gauntlets (Rank 1)",
          'Treasure Hunter Field Wear (M)',
          'Treasure Hunter Field Wear (F)',
          'Treasure Hunter Bracers (M)',
          'Treasure Hunter Bracers (F)',
          'Treasure Hunter Boots (M)',
          'Treasure Hunter Boots (F)',
          'Lucky Blue Upgrade Stone',
          'Lucky Red Upgrade Stone',
          'Black Star (Rank 1)',
          "Black Dragon Knight's Giant Sword (Rank 1)",
        ];
    this.gachaPool = !useDummyData ? [] : this.gachaList;
  }

  static async Create(
    gachaName: string,
    gachaURL: string,
    useDummyData?: boolean
  ) {
    return new Gachapon(gachaName, gachaURL, useDummyData);
  }

  public fetchDataForGachapon = async () => {
    if (!this.useDummyData) {
      this.gachaList = await gachaponServices?.getListOfItemsFromGacha(
        this.gachaName
      );
      this.gachaPool = await gachaponServices?.getPoolListFromGacha(
        this.gachaName
      );
    }
  };

  /*
   * Pull a random item from the gachaPool.
   */
  public getRandomItem = () => {
    return this.gachaPool?.[Math.floor(Math.random() * this.gachaPool?.length)];
  };

  /**
   * Pull random items (numPulls times) from the pool of items and return the results
   *
   * @param numPulls <number>
   * @returns results <string[]>
   */
  public getRandomItemsByQuantity = (numPulls: number): string[] => {
    let results = [];
    for (let i = 0; i < numPulls; i++) {
      results?.push(this.getRandomItem());
    }
    return results;
  };

  /**
   * Randomly pull items from the pool until the item you are searching for is pulled.
   *
   * @param itemName <string>
   * @returns results <string[]>
   */
  public getRandomlyItemBySpecifics = (itemName: string) => {
    let results = [];

    if (this.gachaList?.includes(itemName)) {
      let randomItem = '';
      while (randomItem !== itemName) {
        randomItem = this?.getRandomItem();
        results?.push(randomItem);
      }
    }
    return results;
  };

  /**
   * Given the number of pulls, calculate the quoted price assuming that gacahs are sold in denominations of 45 boxes/57,500 NX, 11 Boxes/15,000NX, 1 Box/1,500NX.
   *
   * TODO: Potentially we may need to support variable Gachapon prices in the future.
   *
   * @params numPulls <number>
   * @returns numPrice <number> Price in NX
   */
  static getQuotedPriceForPulls = (numPulls: number) => {
    let bundleFourFive = Math.trunc(numPulls / 45); //quantity of 45
    let bundleEleven = Math.trunc((numPulls % 45) / 11); // quantity of 11
    let bundleSingle = (numPulls % 45) % 11;

    let numPrice =
      bundleFourFive * 57500 + //quantity of 45
      bundleEleven * 15000 + // quantity of 11
      bundleSingle * 1500; // remaining individuals

    return numPrice;
  };
}

// Contains gaching logic and gachapon items

import { RouteConfigLoadEnd } from '@angular/router';
import axios from 'axios';
declare const gachaLogic: any;

export class Gachapon {
  public gachaName: string; //Gachapon's Name
  public gachaURL: string; //Image URL
  public gachaList: string[]; //List of items contained in the gachapon

  //Temporary constructor until ".txt" conversion to array logic is moved
  constructor(gachaName: string, gachaURL: string) {
    this.gachaName = gachaName;
    this.gachaURL = gachaURL;
    this.gachaList = [];

    axios
      .get(`https://mabinogi-gacha.herokuapp.com/gacha/${gachaName}`)
      .then((res) => {
        for (let i = 1; i < res.data.length; i += 2) {
          this.gachaList.push(res.data[i]);
        }
      })
      .catch((error) => {
        // If the call fails, populate the list with these default values.
        this.gachaList = [
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
      });
  }
}

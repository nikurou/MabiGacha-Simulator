
// Contains gaching logic and gachapon items

import { RouteConfigLoadEnd } from '@angular/router';


declare const gachaLogic:any;

export class Gachapon{
    public gachaName: string;   //Gachapon's Name
    public gachaURL: string;    //Image URL
   
    public gachaList: string[]; //List of items contained in the gachapon
   
    //Temporary constructor until ".txt" conversion to array logic is moved
    constructor(gachaName:string , gachaURL: string){
        this.gachaName = gachaName;
        this.gachaURL = gachaURL;

        this.gachaList = ["0.10", "Special Forest Ranger Outfit (M)", "0.10", "Special Forest Ranger Outfit (F)", "0.10", "Special Forest Ranger Muffler Outfit (M)", "0.10", "Special Forest Ranger Muffler Outfit (F)", "0.10", "Forest Ranger Two-Handed Sword", "0.10", "Forest Ranger Long Bow", "0.10", "Forest Muffler Wings (Dyeable, Enchantable)", "0.10", "Forest Leaf Muffler Wings (Dyeable, Enchantable)", "0.10", "Forest Ranger Boots (M)", "0.10", "Forest Ranger Boots (F)", "0.13",
        "Red Forest Muffler Wings (Dyeable)", "0.13", "Gold Forest Muffler Wings (Dyeable)", "0.13", "Black Forest Muffler Wings (Dyeable)", "0.13", "White Forest Muffler Wings (Dyeable)", "0.13", "Red Forest Leaf Muffler Wings (Dyeable)", "0.13", 
        "Gold Forest Leaf Muffler Wings (Dyeable)", "0.13", "Black Forest Leaf Muffler Wings (Dyeable)", "0.13", "White Forest Leaf Muffler Wings (Dyeable)", "0.15", "Forest Ranger Gloves (M)", "0.15", "Forest Ranger Gloves (F))", "0.15",
        "Forest Ranger Wig and Hat (M)", "0.15", "Forest Ranger Wig and Hat (F)", "0.24", "Red Forest Aura Halo", "0.21", "Gold Forest Aura Halo", "0.21", "Black Forest Aura Halo", "0.21",
        "White Forest Aura Halo", "0.24", "Natural Forest Wood Halo", "0.19", "Gold Forest Wood Halo", "0.19", "Black Forest Wood Halo", "0.19", "White Forest Wood Halo", "0.11",
        "Creepy Enchant Scroll Coupon", "0.11", "Eerie Enchant Scroll Coupon", "0.11", "Spooky Enchant Scroll Coupon", "0.11", "Haunted Enchant Scroll Coupon", "0.11", "Brainstorm Enchant Scroll Coupon", "0.11", 
        "Resolution Enchant Scroll Coupon", "0.25", "Forest Ranger Muffler Outfit (M)", "0.25", "Forest Ranger Muffler Outfit (F)", "0.25", "Forest Ranger Outfit (M)", "0.25", "Forest Ranger Outfit (F)", "0.17", 
        "Forest Ranger Wig (M)", "0.17", "Forest Ranger Wig (F)", "0.64", "Forest Ranger Two-Handed Sword Appearance Scroll", "0.64", "Forest Ranger Long Bow Appearance Scroll", "0.85", "Forest Ranger Arrow Bundle (5000 arrows)", "0.25",
        "Hideous Enchant Scroll Coupon", "0.25", "Chilly Enchant Scroll Coupon", "0.25", "Terror Enchant Scroll Coupon", "0.25", "Urban Legend Enchant Scroll Coupon", "0.42", "Monochromatic Red Pack", "0.42",
        "Monochromatic Gold Pack", "0.42", "Monochromatic Green Pack", "0.68", "Chainsaw", "0.68", "Nail Bat", "0.68", "Crowbar", "0.59", 
        "Christmas Coat (M)", "0.59", "Christmas Coat (F)", "0.68", "Christmas Boots (M)", "0.68", "Christmas Shoes (F)", "0.68", "Christmas Gloves (M)", "0.68",
        "Christmas Gloves (F)", "0.59", "Old Saint Nick Outfit (M)", "0.59", "Old Saint Nick Outfit (F)", "0.68", "Old Saint Nick Boots (M)", "0.68", "Old Saint Nick Boots (F)", "0.59",
        "Santa's Helper Outfit (M)", "0.59", "Santa's Helper Outfit (F)", "0.76", "Santa's Helper Shoes (M)", "0.76", "Santa's Helper Shoes (F)", "0.81", "Homestead Housing White Christmas Tree", "0.81", 
        "Homestead Housing Christmas Tree", "0.81", "Homestead Housing Christmas Wreath", "0.81", "Homestead Housing Rudolph", "0.81", "Homestead Housing Snowflake Flurry", "0.85", "Santa's Helper Hat (M)", "0.85",
        "Santa's Helper Hat (F)", "0.68", "Avelin Wig (Enchant: Oblivion)", "0.68", "Talvish Wig (Enchant: Oblivion)", "0.85", "Talvish's Armor (Rank 1)", "0.85", "Talvish's Gauntlets (Rank 1)", "0.85", 
        "Talvish's Greaves (Rank 1)", "0.85", "Altam's Armor (Rank 1)", "0.85", "Altam's Greaves (Rank 1)", "0.85", "Altam's Gauntlets (Rank 1)", "0.85", "Avelin's Armor (Rank 1)", "0.85",
        "Avelin's Greaves (Rank 1)", "0.85", "Avelin's Gauntlets (Rank 1)", "0.93", "Treasure Hunter Field Wear (M)", "0.93", "Treasure Hunter Field Wear (F)", "0.93", "Treasure Hunter Bracers (M)", "0.93", 
        "Treasure Hunter Bracers (F)", "0.93", "Treasure Hunter Boots (M)", "0.93", "Treasure Hunter Boots (F)", "1.06", "Lucky Blue Upgrade Stone", "1.06", "Lucky Red Upgrade Stone", "0.81",
        "Black Star (Rank 1)", "0.64", "Black Dragon Knight's Giant Sword (Rank 1)", "0.68", "Krutta Broad Sword (Rank 1)", "0.64", "Black Dragon Knight's Bow (Rank 1)", "1.10", "Lorna's Special Gold Coin Box", "1.10", 
        "Pan's Special Gold Coin Box", "0.85", "Snowflake Coat", "0.85", "Snowflake Dress", "1.02", "Direct Dye Ampoule", "1.02", "Direct Pet Dye Ampoule", "1.02",
        "Direct Magical Instrument Dye", "1.02", "Direct Metal Dye Ampoule", "1.27", "Snowflake Boots", "1.27", "Snowflake Shoes", "1.27", "Snowflake Hat", "1.27",
        "Snowflake Hairpin", "1.27", "Sweet Gingerman Mini-Gem", "1.27", "Savory Gingerman Mini-Gem", "1.27", "Buttery Gingerman Mini-Gem", "1.27", "Crispy Gingerman Mini-Gem", "1.53", 
        "Lorna's Goldbox", "1.53", "Pan's Goldbox", "1.53", "Crusader 2x EXP Potion (30 min)", "0.85", "Potent Finest Shadow Crystal (Tradeable) x10", "1.53", "Homestead Golden Sprout x5", "0.85",
        "Royal Crystal Wing Sword (Rank 1)", "0.85", "Royal Crystal Wing Bow (Rank 1)", "0.85", "Royal Crystal Wing Staff (Rank 1)", "0.85", "Engraved Control Bar (Enchant: Carved) (Rank 1)", "0.85", "Jeweled Control Bar (Enchant: Carved) (Rank 1)", "0.85", 
        "Bracer Knuckle (Enchant: Heavy Punch) (Rank 1)", "0.85", "Champion Knuckle (Enchant: Heavy Punch) (Rank 1)", "0.85", "Demonic Hellfire Cylinder (Enchant: Synergy) (Rank 1)", "0.93", "Demonic Abyss Cylinder (Enchant: Moist) (Rank 1)", "0.93", "Glory Sword (Enchant: Lich) (Enchant: Spike) (Rank 1)", "0.93",
        "Dustin Silver Knight Sword (Enchant: Lich) (Enchant: Crocodile) (Rank 1)", "0.93", "Broad Axe (Enchant: Lich) (Enchant: Crocodile) (Rank 1)", "0.93", "Battle Hammer (Enchant: Lich) (Enchant: Crocodile) (Rank 1)", "0.93", "Highlander Long Bow (Enchant: Nobility) (Enchant: Palm Tree) (Rank 1)", "0.85", "Life 2x EXP Potion (1 Day)", "0.85",
        "Magic 2x EXP Potion (1 Day)", "0.85", "Close Combat 2x EXP Potion (1 Day)", "0.85", "Music 2x EXP Potion (1 Day)", "0.85", "Martial Arts 2x EXP Potion (1 Day)", "0.85", "Chain Slash 2x EXP Potion (1 Day)", "1.27", 
        "Combat 2x EXP Potion (10 min)", "1.27", "Regular Gem Powder Upgrade Coupon", "1.27", "Echostone Awakening Stimulant Upgrade Coupon", "1.27", "Fine Echostone Awakening Stimulant Upgrade Coupon", "1.27", "Speed Walk Potion 30% (30 min)", "1.27",
        "Speed Walk Potion 40% (30 min)", "1.27", "Fine Gem Powder", "1.27", "Regular Gem Powder"];
    }
    

}
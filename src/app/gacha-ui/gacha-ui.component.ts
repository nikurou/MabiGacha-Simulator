import { Component, ViewChild, Input } from '@angular/core';

import { Gachapon } from './gacha-logic'

import axios from 'axios';
import { OptionsComponent } from './options/options.component';
import { RatesComponent } from '../rates/rates.component'
import { ConsoleComponent } from '../console/console.component';


declare const gachaLogic: any;

@Component({
  selector: 'app-gacha-ui',
  templateUrl: './gacha-ui.component.html',
  styleUrls: ['./gacha-ui.component.css'],
})
export class GachaUIComponent {

  currentGachaObject: Gachapon;
  selectedGachapon: string; //Sent to options component
  selectedImage: string;
  selectedList: string[]; //Sent to options component
  serverStringURL: string; //Receive from child component
  disable: String;  //Determines if the Gach button is disabled or not RECEIVED from options.component.ts
  totalGacha: string;
  totalNX: string;
  public resultGach: string[]; //Holds all the output from server...To be passed to Console
  public currResultGach: string[]; //Holds the output from just the current gach 

  optionsDisable: string;

  gachas = [
    new Gachapon('Secret Garden Box', 'assets/img/mabinogi-secret-garden-box-webicon.png'),
    new Gachapon('Crow Feather Box', 'http://nxcache.nexon.net/cms/2020/q2/1894/mabinogi-crow-feather-box.png'),
    new Gachapon('Forest Ranger Bag Gachapon', 'http://nxcache.nexon.net/cms/2019/q4/2120/forest-guardian_basic.png'),
    new Gachapon('Erinn Beauty Box', 'http://nxcache.nexon.net/cms/2020/q3/1711/mabinogi-erinn-beauty-box-webicon.png'),
  ]

  constructor() {
    this.currentGachaObject = this.gachas[0];
    this.selectedGachapon = this.gachas[0].gachaName;
    this.selectedImage = this.gachas[0].gachaURL;
    this.selectedList = this.gachas[0].gachaList;
    this.disable = "false";
    this.resultGach = [];
    this.currResultGach = [];
    if (localStorage.getItem("Total Gacha") === null) {
      localStorage.setItem("Total Gacha", "0");
    }
    this.totalGacha = localStorage.getItem("Total Gacha");
    if (localStorage.getItem("Total NX") === null) {
      localStorage.setItem("Total NX", "0");
    }
    this.totalNX = localStorage.getItem("Total NX");
  }

  //Receive StringURL built from current options and save it serverStringURL
  receiveFromChild($event) {
    this.serverStringURL = $event;
    console.log("Received: " + this.serverStringURL);
  }

  recieveDisabilityFromChild($event) {
    this.optionsDisable = $event;
  }

  /* Upon selection of new gachapon update all the properties*/
  selectedItem(gacha: Gachapon) {
    this.currentGachaObject = gacha;
    this.selectedGachapon = gacha.gachaName;
    this.selectedImage = gacha.gachaURL;
    this.selectedList = gacha.gachaList;
  }

  /* Gach from the current gachapon, and send the gacha result to Console Component*/
  gach() {
    // http://localhost:5000/gacha/bulk/Forest Ranger Bag Gachapon/5
    axios.get(this.serverStringURL)
      .then(res => {
        //console.log(res.data[0]) //Result of gaching
        this.currResultGach = res.data[0];
        this.resultGach = this.resultGach.concat(res.data[0]);
        let numItems = res.data[1].length;
        this.totalGacha = (parseInt(this.totalGacha, 10) + numItems).toString();
        localStorage.setItem("Total Gacha", this.totalGacha);

        let fortyfive = (numItems - numItems % 45) / 45 * 57500;
        let eleven = (numItems % 45 - (numItems % 45) % 11) / 11 * 15000;
        let one = (numItems % 45) % 11 * 1500;
        this.totalNX = (parseInt(this.totalNX, 10) + (fortyfive + eleven + one)).toString();
        localStorage.setItem("Total NX", this.totalNX);
        for (let i = 0; i < res.data[1].length; i++) {
          let separated = res.data[1][i].split(/, /);
          for (let j = 0; j < separated.length; j++) {
            if (localStorage.getItem(separated[j]) === null) {
              localStorage.setItem(separated[j], "1");
            } else {
              let quantity = parseInt(localStorage.getItem(separated[j]), 10) + 1;
              localStorage.setItem(separated[j], quantity.toString());
            }
          }
        }
      });
  }

  //Disables the user from gaching per click for 2 seconds
  setTimeOut(time) { //not a built in js function
    console.log("At the start of this function paause is :" + this.disable);
    this.disable = "true";
    console.log("paused");
    setTimeout(() => {
      this.disable = "false";
      console.log("unpaused");
    }, time); //2 second dont press gach button
  }

  // Returns "true" or "false" string depending IFF at least one is paused
  buttonDisable(localDisable){
    let disableToReturn: string;
    if(localDisable === "false" && this.optionsDisable === "false"){
      disableToReturn ="false";
    }
    else{
      disableToReturn = "true";
    }
    console.log("DisableToRetrun: " + disableToReturn);
    return disableToReturn;
  }
}
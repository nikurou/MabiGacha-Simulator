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
  selectedImage: string;
  selectedGachapon: string; //Sent to options component
  selectedList: string[]; //Sent to options component
  disable: String;  //Determines if the Gach button is disabled
  totalGacha: string;
  totalNX: string;
  
  serverStringURL: string; //Receive from child component
  slowModeStatus: boolean; // Received from console.component.ts
  optionsDisable: string; //Receieved from options.component.ts
  
  public resultGach: string[]; //Holds all the output from server...Sent to Console
  public currResultGach: string[]; //Holds the output from just the current gach 

  gachas = [
    new Gachapon('Secret Garden Box', 'assets/img/mabinogi-secret-garden-box-webicon.png'),
    new Gachapon('Crow Feather Box', 'assets/img/mabinogi-crow-feather-box.png'),
    new Gachapon('Forest Ranger Bag Gachapon', 'assets/img/forest-guardian_basic.png'),
    new Gachapon('Erinn Beauty Box', 'assets/img/mabinogi-erinn-beauty-box-webicon.png'),
  ]

  constructor() {
    this.currentGachaObject = this.gachas[0];
    this.selectedGachapon = this.gachas[0].gachaName;
    this.selectedImage = this.gachas[0].gachaURL;
    this.selectedList = this.gachas[0].gachaList;
    this.disable = "false";
    this.optionsDisable = "false";
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

  recieveSlowModeStatus($event){
    this.slowModeStatus = $event;
  }
  
  /* Upon selection of new gachapon update all the properties*/
  selectedItem(gacha: Gachapon) {
    this.currentGachaObject = gacha;
    this.selectedGachapon = gacha.gachaName;
    this.selectedImage = gacha.gachaURL;
    this.selectedList = gacha.gachaList;
  }
  
  //Disables the user from gaching per click for 2 seconds
  setTimeOut() { //not a built in js function
    console.log("At the start of this function paause is :" + this.disable);
    this.disable = "true";
    console.log("paused");

    let time = 2000;

    if(this.slowModeStatus == true){
      console.log("CurrentResultGach Lenght: " + this.currResultGach.length);
      time = this.currResultGach.length * 500; //numItem x 500 ms per gach is the lenght of button disable
    } 

    setTimeout(() => {
      this.disable = "false";
      console.log("unpaused");
    }, time); //2 dont press if not slow mode, else variable time.
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
      }).then(()=>{
        //Now that we're gaching, time out.
        this.setTimeOut();
      })
  }


  // Returns "true" or "false" string depending IFF at least one is paused
  // This method is called by the button itself.
  buttonDisable(localDisable){
    let disableToReturn: string;
    
    if(localDisable === "false" && this.optionsDisable === "false"){
      disableToReturn ="false";
    }
    else{
      disableToReturn = "true";
    }
    
    return disableToReturn;
  }
}
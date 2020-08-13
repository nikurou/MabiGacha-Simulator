import { Component, ViewChild} from '@angular/core';

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
  disable: String;  //Determines if the Gach button is disabled or not.
  totalGacha: string;
  public resultGach: string[]; //Holds all the output from server...To be passed to Console

  // NOTE TO SELF: ENSURE that user typed entry is an item that exists in the list..


  gachas = [
    new Gachapon('Secret Garden Box', 'assets/img/mabinogi-secret-garden-box-webicon.png'),
    new Gachapon('Crow Feather Box', 'http://nxcache.nexon.net/cms/2020/q2/1894/mabinogi-crow-feather-box.png'),
    new Gachapon('Forest Ranger Bag Gachapon', 'assets/img/mabinogi-secret-garden-box-webicon.png'),
  ]
  
  constructor() {
    this.currentGachaObject = this.gachas[0];
    this.selectedGachapon = this.gachas[0].gachaName;
    this.selectedImage = this.gachas[0].gachaURL;
    this.selectedList = this.gachas[0].gachaList;
    this.disable = "false";
    this.resultGach = [];
    if(localStorage.getItem("Total Gacha") === null){
        localStorage.setItem("Total Gacha", "0"); 
    }
    this.totalGacha = localStorage.getItem("Total Gacha");
  }
  
  //Receive StringURL built from current options and save it serverStringURL
  receiveFromChild($event) {
    this.serverStringURL = $event;
    console.log("Received: " + this.serverStringURL);
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
        this.resultGach = this.resultGach.concat(res.data[0]);
        this.totalGacha = (parseInt(this.totalGacha,10) + res.data[1].length).toString(); 
        localStorage.setItem("Total Gacha", this.totalGacha);
        for(let i = 0; i < res.data[1].length;i++){
            if(localStorage.getItem(res.data[1][i])===null){
                localStorage.setItem(res.data[1][i], "1");
            }else{
                let quantity = parseInt(localStorage.getItem(res.data[1][i]),10) + 1;
                localStorage.setItem(res.data[1][i], quantity.toString());
            }
        }
      });
  }

}
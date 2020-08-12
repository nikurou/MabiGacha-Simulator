import { Component, ViewChild} from '@angular/core';

import { Gachapon } from './gacha-logic'

import axios from 'axios';
import { OptionsComponent } from './options/options.component';


declare const gachaLogic: any;

@Component({
  selector: 'app-gacha-ui',
  templateUrl: './gacha-ui.component.html',
  styleUrls: ['./gacha-ui.component.css']
})
export class GachaUIComponent {

  currentGachaObject: Gachapon;
  selectedGachapon: string; //Sent to options component
  selectedImage: string;
  selectedList: string[]; //Sent to options component
  serverStringURL: string; //Receive from child component

  // NOTE TO SELF: ENSURE that user typed entry is an item that exists in the list..

  @ViewChild('child') child:OptionsComponent;

  

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
    
    //alert("test: " + this.serverStringURL);
    // http://localhost:5000/gacha/bulk/Forest Ranger Bag Gachapon/5
    axios.get(this.serverStringURL)
      .then(res => {
        console.log(res.data)
      });
  }

}
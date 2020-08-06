import { Component, OnInit } from '@angular/core';

import {Gachapon} from './gachapon'

@Component({
  selector: 'app-gacha-ui',
  templateUrl: './gacha-ui.component.html',
  styleUrls: ['./gacha-ui.component.css']
})
export class GachaUIComponent implements OnInit {

  selectedGachapon: string;
  selectedImage: string;
  selectedList: string[];
  

  gachas = [ 
    new Gachapon('Secret Garden Box', 'assets\gachapon-images\mabinogi-secret-garden-box-webicon.png', ["item1", "item2", "item3"]),
    new Gachapon('Crow Feather Box', 'http://nxcache.nexon.net/cms/2020/q2/1894/mabinogi-crow-feather-box.png', ["item4", "item5", "item6"]),
    new Gachapon('Winter Fairy Box', 'assets\gachapon-images\mabinogi-secret-garden-box-webicon.png', ["item1", "item2", "item3"]),
  ]

  constructor() {
    this.selectedGachapon = this.gachas[0].gachaName;
    this.selectedImage = this.gachas[0].gachaURL;
    this.selectedList = this.gachas[0].gachaList;
  }

  ngOnInit(): void {
  }

  /* Upon selection of new gachapon update all the properties*/
  selectedItem(gacha: any){
    this.selectedGachapon = gacha.gachaName;
    this.selectedImage = gacha.gachaURL;
    this.selectedList = gacha.gachaList;
  }

  /* If the user is not already on console tab, switch them to console tab */
  onClick(){
    
  }

}
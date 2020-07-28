import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gacha-ui',
  templateUrl: './gacha-ui.component.html',
  styleUrls: ['./gacha-ui.component.css']
})
export class GachaUIComponent implements OnInit {

  selectedGachapon: string;
  gachapons: string[] = ['Secret Garden Box', 'Winter Fairy Box', 'Forest Ranger Bag', 'Frozen Heart Gachapon', 'Eweca Orb',
                          'Crow Feather Box'];

  constructor() { 

  }

  ngOnInit(): void {
    this.selectedGachapon = this.gachapons[0];
  }

  selectedItem(gacha: string){
    this.selectedGachapon = gacha;
  }

  /* If the user is not already on console tab, switch them to console tab */
  onClick(){
    
  }

}

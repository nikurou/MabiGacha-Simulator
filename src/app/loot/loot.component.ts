import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface lootElement {
  name: string;
  position: number;
  quantity: number;
}

let ELEMENT_DATA: lootElement[]; 
ELEMENT_DATA = [];

for(let i = 0; i < localStorage.length;i++){
    let key = localStorage.key(i);
    if(key !== "Total Gacha" && key !== "Total NX"){
      ELEMENT_DATA.push({position: i+1, name: key, quantity: parseInt(localStorage.getItem(key), 10)});
    }
  } 

@Component({
  selector: 'app-loot',
  templateUrl: './loot.component.html',
  styleUrls: ['./loot.component.css']
})
export class LootComponent implements OnInit {
  
  ELEMENT_DATA = [];

  displayedColumns: string[] = ['position', 'name', 'quantity'];
  dataSource = new MatTableDataSource<lootElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  //Called only when user switches tab to loot
  reInit():void{
    
    ELEMENT_DATA = []; //re-set data because we're reading it all again
    this.dataSource = new MatTableDataSource<lootElement>(ELEMENT_DATA);

    for(let i = 0; i < localStorage.length;i++){
      let key = localStorage.key(i);
      if(key !== "Total Gacha" && key !== "Total NX"){
        ELEMENT_DATA.push({position: i+1, name: key, quantity: parseInt(localStorage.getItem(key), 10)});
      }
    } 

    this.dataSource.paginator = this.paginator;
  }

  clearData():void{
    ELEMENT_DATA = []; //re-set data because we're reading it all again
    localStorage.clear();
    this.dataSource = new MatTableDataSource<lootElement>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;

  }



}

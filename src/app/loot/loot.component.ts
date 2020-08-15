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

  topMessage: string; 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    if(ELEMENT_DATA.length == 0){
      this.topMessage = "wow such empty";
    }
    else{
      this.reInit();
    }
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

    if(ELEMENT_DATA.length == 0){
      this.topMessage = "you refreshed...but it's still empty";
    }
    else if(ELEMENT_DATA.length >= 1 && ELEMENT_DATA.length < 100){
      this.topMessage = "those are some rookie numbers!";
    }
    else if(ELEMENT_DATA.length >= 100 && ELEMENT_DATA.length < 200){
      this.topMessage = "bruh, that's a lot of loot";
    }
    else if(ELEMENT_DATA.length >= 200 && ELEMENT_DATA.length < 300){
      this.topMessage = "you're an addict!";
    }
    else if(ELEMENT_DATA.length >= 300 && ELEMENT_DATA.length < 400){
      this.topMessage = "How does it feel like to be a whale?";
    }
    else{
      this.topMessage = "pengus are superior to buns";
    }

    this.dataSource.paginator = this.paginator;
  }

  clearData():void{
    ELEMENT_DATA = []; //re-set data because we're reading it all again
    localStorage.clear();
    this.dataSource = new MatTableDataSource<lootElement>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.topMessage = "deleted!"

  }



}

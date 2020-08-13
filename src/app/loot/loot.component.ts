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
    ELEMENT_DATA.push({position: i+1, name: key, quantity: parseInt(localStorage.getItem(key), 10)});
} 

@Component({
  selector: 'app-loot',
  templateUrl: './loot.component.html',
  styleUrls: ['./loot.component.css']
})
export class LootComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'quantity'];
  dataSource = new MatTableDataSource<lootElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }


}

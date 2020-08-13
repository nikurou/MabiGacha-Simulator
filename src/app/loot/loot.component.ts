import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface lootElement {
  name: string;
  position: number;
  quantity: number;
}

const ELEMENT_DATA: lootElement[] = [
  {position: 1, name: 'Special Forest Pengu', quantity: 1},
  {position: 1, name: 'Special Forest Pengu', quantity: 1},
  {position: 1, name: 'Special Forest Pengu', quantity: 1},
  {position: 1, name: 'Special Forest Pengu', quantity: 1},
  {position: 1, name: 'Special Forest Pengu', quantity: 1},
  {position: 1, name: 'Special Forest Pengu', quantity: 1},
  {position: 1, name: 'Special Forest Pengu', quantity: 1},
  {position: 1, name: 'Special Forest Pengu', quantity: 1},
  {position: 1, name: 'Special Forest Pengu', quantity: 1},
];

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

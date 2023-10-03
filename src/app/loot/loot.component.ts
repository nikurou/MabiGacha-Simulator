import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { gachaLoot } from '../gacha-ui/gacha-ui.component';

export interface lootElement {
  name: string;
  position: number;
  quantity: number;
}


@Component({
  selector: 'app-loot',
  templateUrl: './loot.component.html',
  styleUrls: ['./loot.component.css'],
})
export class LootComponent implements OnInit {
  ELEMENT_DATA = [];

  displayedColumns: string[] = ['position', 'name', 'quantity'];
  dataSource = new MatTableDataSource<lootElement>(this.ELEMENT_DATA);

  topMessage: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.initTableData();

    if (this.dataSource.data.length == 0) {
      this.topMessage = 'wow such empty';
    }
  }

  //Called only when user switches tab to loot
  initTableData(): void {
    let tableData = []; //re-set data because we're reading it all again
    const { lootList }: { lootList: gachaLoot } =
      JSON?.parse(localStorage?.getItem?.('gachaCache')) || [];

    if (lootList) {
      let indexCounter = 1;
      for (const [key, value] of Object.entries(lootList)) {
        tableData.push({
          position: indexCounter,
          name: value.name,
          quantity: value.quantity,
        });
        indexCounter += 1;
      }
    }

    this.dataSource.data = tableData;

    if (tableData.length == 0) {
      this.topMessage = "you refreshed...but it's still empty";
    } else if (tableData.length >= 1 && tableData.length < 100) {
      this.topMessage = 'those are some rookie numbers!';
    } else if (tableData.length >= 100 && tableData.length < 200) {
      this.topMessage = "that's a lot of loot";
    } else if (tableData.length >= 200 && tableData.length < 300) {
      this.topMessage = "you're an addict!";
    } else if (tableData.length >= 300 && tableData.length < 400) {
      this.topMessage = 'How does it feel like to be a whale?';
    } else {
      this.topMessage = 'pengus are superior to buns';
    }

    this.dataSource.paginator = this.paginator;
  }

  clearData(): void {
    this.ELEMENT_DATA = []; //re-set data because we're reading it all again
    localStorage.clear();
    this.dataSource = new MatTableDataSource<lootElement>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.topMessage = 'deleted!';
  }
}

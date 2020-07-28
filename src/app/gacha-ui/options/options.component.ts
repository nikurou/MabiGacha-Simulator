import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  selected = '1';
  
  selectedItem: string;
  items: string[] = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'];

  constructor() { }

  ngOnInit(): void {
  }

  

}

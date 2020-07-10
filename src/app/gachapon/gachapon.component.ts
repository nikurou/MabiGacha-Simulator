import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ConsoleComponent } from '../console/console.component';
import { RatesComponent } from '../rates/rates.component';




@Component({
  selector: 'app-gachapon',
  templateUrl: './gachapon.component.html',
  styleUrls: ['./gachapon.component.css'],
  encapsulation: ViewEncapsulation.None
  
})
export class GachaponComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  //DEFAULT COMPONENTS
  consoleComponent = ConsoleComponent;
  ratesComponent = RatesComponent;
}

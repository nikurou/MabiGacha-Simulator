import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  @Input() resultGach: string[]; //Passed to us from gacha-ui
  public localResultGach: string[];

  constructor() {
  }

  //Append localResultGach with the resultGach passed to us from server.
  append(){
   
  }

  ngOnInit(): void {
 
  }

}

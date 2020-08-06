import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() selectedList: string[];
  
  selected = '1';
  public selectedItem: string;
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(e){
    this.selectedItem = e.target.value;
  }
  

}

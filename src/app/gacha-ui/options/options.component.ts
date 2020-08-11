import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() selectedList: string[]; // Passed to us from gacha-UI 
  
  public selectedItem: string;    // Name of selected item
  public quantity: number;        // Quantity gaching by (Meant for DISPLAY, NOT wiped when changing to "specific" gach)
  public trueQuantity: number;    // Quantity gaching by (The actual value fed to methods, wiped when changing to "specific" gach)
  public selectedOption: string;  // Option can either be "bulk" or "specific"

  
  constructor() { }

  // By default, user gaches in bulk of 1 and Option "bulk" is preselected for user.
  ngOnInit(): void {
    this.quantity = 1;
    this.trueQuantity = 1;
    this.selectedOption = "bulk";
  }

  onSelect(e){
    this.selectedItem = e.target.value;
  }

  /*
   * Called when user changes between "bulk" or "specific" gach.
   * String option is always either "bulk" or "specific".
   * This function clears out any irrelevant field data that is not necessary
   * with the selected option.
  */
  radioChange(option){
    
    // Clear selectedItem
    if(option == "bulk"){
      this.selectedItem = null; 
      this.trueQuantity  = this.quantity; //Set trueQuantity to currently displayed value on the dropdown. 
                                          // This way, even though we clear trueQuantity when switching to "specific", 
                                          // Switching back to bulk, gives us our old value where we left off.
    }

    // Clear quantity 
    if(option == "specific"){
      this.trueQuantity = null;
    }
    
  }
}

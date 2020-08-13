import { Component, Input, EventEmitter, Output } from '@angular/core';



@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {

  @Input() selectedList: string[]; // Passed to us from gacha-UI
  @Input() selectedGachapon: string; //Passed to us from gacha-UI 

  public selectedItem: string;    // Name of selected item
  public quantity: number;        // Quantity gaching by (Meant for DISPLAY, NOT wiped when changing to "specific" gach)
  public trueQuantity: number;    // Quantity gaching by (The actual value fed to methods, wiped when changing to "specific" gach)
  public selectedOption: string;  // Option can either be "bulk" or "specific"

  public serverStringURL: string;
  public errorMessage: string; // Tells user if item exist or not.

  //Required for sending to Parent Component (gacha-ui)
  @Output() messageEvent = new EventEmitter<string>();

  //Function to send message, Link this function to gach() in gacha-ui.component.ts
  sendToParent() {
    this.linkBuilder(); //Build the link one final time before send
    this.messageEvent.emit(this.serverStringURL);
  }

  // By default, user gaches in bulk of 1 and Option "bulk" is preselected for user.
  constructor() {
    this.quantity = 1;
    this.trueQuantity = 1;
    this.selectedOption = "bulk";
    this.errorMessage = "";
  }

  
  verifyItemExist(selectedItem){
    //If selected item isnt null AND it's not in the list
    if(selectedItem!= null && this.selectedList.includes(selectedItem) == false){
      //Send error message
      this.errorMessage = "The item you inputted does not exist! Please try again...";
      //Disable Gach Button
    }
    else{
      this.errorMessage = "";
    }
  }
  
  //Build the link for server
  linkBuilder() {
    // http://localhost:5000/gacha/bulk/Forest Ranger Bag Gachapon/5
    if (this.selectedOption == 'bulk') {
      this.serverStringURL = "http://localhost:5000/gacha/" + this.selectedOption + "/" + this.selectedGachapon + "/" + this.trueQuantity;
    }
    if (this.selectedOption == 'specific') {
      this.serverStringURL = "http://localhost:5000/gacha/" + "single" + "/" + this.selectedGachapon + "/" + this.selectedItem;
    }
    
  }
  
  //On select from dropdown of either radio buttions
  onSelect(e, option) {
    // If you select anything from a dropdown, it automatically changes selected radio option to the respective
    // option is belongs to..
    if(option == 'specific'){
      this.selectedOption = "specific";
      this.selectedItem = e.target.value; //Set the specific item for specific
      this.verifyItemExist(this.selectedItem);
    }
    if(option == 'bulk'){
      this.selectedOption = "bulk";
      this.errorMessage = ""; //Clear error message as bulk doesn't use item
    }
  }

  /*
  * Called when user changes between "bulk" or "specific" gach.
  * String option is always either "bulk" or "specific".
  * This function clears out any irrelevant field data that is not necessary
  * with the selected option.
  */
 radioChange(option) {
   
   // Clear selectedItem
   if (option == "bulk") {
      this.selectedItem = null;
      this.trueQuantity = this.quantity; //Set trueQuantity to currently displayed value on the dropdown. 
      this.errorMessage = ""; //Clear error message bulk doesn't use items
    }

    // Clear quantity 
    if (option == "specific") {
      this.trueQuantity = null;
    }

  }
}

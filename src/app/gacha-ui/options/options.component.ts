import { Component, Input, EventEmitter, Output } from '@angular/core';

export interface userSelectedOptions {
  quantity?: number;
  selectedOption?: 'bulk' | 'specific';
  specificItem?: string;
}

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent {
  @Input() selectedList: string[]; // Passed to us from gacha-UI
  @Input() selectedGachapon: string; //Passed to us from gacha-UI
  public optionsDisable: string; //Pass to parent gacha-UI

  public selectedItem: string; // Name of selected item
  public quantity: number; // Quantity gaching by (Meant for DISPLAY, NOT wiped when changing to "specific" gach)
  public trueQuantity: number; // Quantity gaching by (The actual value fed to methods, wiped when changing to "specific" gach)
  public selectedOption: userSelectedOptions["selectedOption"]; // Option can either be "bulk" or "specific"

  public serverStringURL: string;
  public errorMessage: string; // Tells user if item exist or not.

  //Required for sending to Parent Component (gacha-ui)
  @Output() disableEvent = new EventEmitter<string>();
  @Output() selectedOptionsEvent = new EventEmitter<userSelectedOptions>();

  // Shares the selected options with the parent component.
  shareOptionsWithParent() {
    let optionsToEmit: userSelectedOptions = {
      quantity: this?.quantity,
      selectedOption: this.selectedOption || 'bulk',
      specificItem: this?.selectedItem || null,
    };
    this?.selectedOptionsEvent?.emit(optionsToEmit);
  }

  //Sends the status of disable to parent gacha-ui.component.ts
  sendDisabilityToParent() {
    this.disableEvent.emit(this.optionsDisable);
  }

  // By default, user gaches in bulk of 1 and Option "bulk" is preselected for user.
  constructor() {
    this.quantity = 1;
    this.trueQuantity = 1;
    this.selectedOption = 'bulk';
    this.errorMessage = '';
    this.optionsDisable = 'false'; //Disable button for gach is false by default
  }

  verifyItemExist(selectedItem) {
    //If selected item isnt null AND it's not in the list
    if (this.selectedList.includes(selectedItem) == false) {
      //Send error message
      this.errorMessage =
        'The item you inputted does not exist! Please try again...';

      //Disable Gach Button
      this.optionsDisable = 'true';
    } else {
      this.errorMessage = '';
      this.optionsDisable = 'false';
    }
  }

  //On select from dropdown of either radio buttions
  onSelect(e, option) {
    // If you select anything from a dropdown, it automatically changes selected radio option to the respective
    // option is belongs to..
    if (option == 'specific') {
      this.selectedOption = 'specific';
      this.selectedItem = e.target.value; //Set the specific item for specific
      this.verifyItemExist(this.selectedItem);
    }
    if (option == 'bulk') {
      this.selectedOption = 'bulk';
      this.errorMessage = ''; //Clear error message as bulk doesn't use item
      this.optionsDisable = 'false'; //Make sure button isnt disabled
    }

    this.shareOptionsWithParent();
  }

  /*
   * Called when user changes between "bulk" or "specific" gach.
   * String option is always either "bulk" or "specific".
   * This function clears out any irrelevant field data that is not necessary
   * with the selected option.
   */
  radioChange(option) {
    // Clear selectedItem
    if (option == 'bulk') {
      this.selectedItem = null;
      this.trueQuantity = this.quantity; //Set trueQuantity to currently displayed value on the dropdown.
      this.errorMessage = ''; //Clear error message bulk doesn't use items
      this.optionsDisable = 'false'; //Make sure button isnt disabled
    }

    // Clear quantity
    if (option == 'specific') {
      this.trueQuantity = null;
      this.verifyItemExist(this.selectedItem);
    }
  }

  //When changing gachapon, clear the search bar.
  clearTheSearch() {
    this.selectedItem = null;
    this.radioChange(this.selectedOption); //Call this to disable input if they're still on specific gach.
  }
}

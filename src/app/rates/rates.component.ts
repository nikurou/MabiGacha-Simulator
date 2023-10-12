import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import gachaponServices from 'src/services/gachaponServices';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css'],
})
export class RatesComponent implements OnInit, OnChanges {
  @Input() selectedGachapon: string; //Passed to us from gacha-UI
  rateNameList: string[];

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }

  //Called only when gachapon changes to re-initialize the array to the new one.
  async init(): Promise<void> {
    if (this?.selectedGachapon) {
      let res = await gachaponServices?.getGachaListObjects(
        this.selectedGachapon
      );
      this.rateNameList = this.combineToProperFormat(res);
    } else {
      this.rateNameList = ['Something went wrong, unable to load list.'];
    }
  }

  //Combine tha array from "rate","name" format to "rate name" format
  combineToProperFormat(resdata) {
    let rateNameList = [];

    for (let i = 0; i < resdata.length; i++) {
      //Combine index two at a time
      rateNameList[i] = resdata[i]?.rate + '%' + '\t' + resdata[i]?.item;
    }

    return rateNameList;
  }
}

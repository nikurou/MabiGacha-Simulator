import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Gachapon } from '../gacha-ui/gacha-logic';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
})
export class ConsoleComponent implements OnInit, OnChanges {
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

  @Output() slowModeStatus = new EventEmitter<boolean>();

  private scrollContainer: any;
  private slowEnabled: boolean;
  //@Input() resultGach: string[]; //Passed to us from gacha-ui [resultGach] = "resultGach"

  resultGach: string[]; // Represents overall results in this session.
  @Input() currResultGach: string[]; //Passed to us from gacha-ui represents latest gacha results.
  timeInterval: number; //time between each interval update
  quotedPrice: number; //how much it would have cost to pull the currResultGach
  resultsFullySynced: boolean; //Has the currResultGach fully been pushed into the resultGach?

  constructor() {
    this.slowEnabled = false;
    this.resultGach = [];
    this.quotedPrice = 0;
    this.resultsFullySynced = false;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe((_) => this.onItemElementsChanged());
  }

  // To ensure that if Input Changes, so do the variables that depend upon it.
  ngOnChanges(changes: SimpleChanges): void {
    this.quotedPrice = Gachapon.getQuotedPriceForPulls(
      this.currResultGach?.length
    );
  }

  sendSlowModeStatus() {
    this.slowModeStatus.emit(this.slowEnabled);
  }

  // Push the results to the array that is displayed on screen either slow or fast
  // Depends on what user toggled.
  public gachPushResults() {
    let i = 0;
    let stopIndex: number;
    this.resultsFullySynced = false;

    if (this.slowEnabled == false) {
      //Hacky workaround to give currResultGach time to be passed from gacha-UI. without this,
      // it gives the list from the last gach batch.
      setTimeout(() => {
        this.resultGach = this.resultGach.concat(this.currResultGach);
        this.resultsFullySynced = true;
      }, 600);
    } else if (this.slowEnabled == true) {
      const handleTimeOut = () => {
        stopIndex = this.currResultGach.length;
        let resultToPush = this.currResultGach[i];
        this.resultGach.push(resultToPush);
        i = i + 1;
        if (i == stopIndex) {
          this.resultsFullySynced = true;
          resultToPush = ''; //If it's pushing empty string, it's not actually updating so scroll doesn't get called.
          return;
        } else {
          thisUpdateter = setTimeout(handleTimeOut, this.timeInterval);
        }
      };
      let thisUpdateter = setTimeout(handleTimeOut, this.timeInterval);
    }
  }

  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  //Slow down the rate at which items are shown
  public toggleSlowMode() {
    this.slowEnabled = !this.slowEnabled;
    if (this.slowEnabled == true) {
      this.timeInterval = 500; //500ms
    } else {
      this.timeInterval = 0; //instant
    }
  }

  /*--AutoScroll from this tutorial: 
  https://pumpingco.de/blog/automatic-scrolling-only-if-a-user-already-scrolled-the-bottom-of-a-page-in-angular/ 
  */
}

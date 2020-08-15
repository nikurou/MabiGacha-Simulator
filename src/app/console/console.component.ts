import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

  @Output() slowModeStatus = new EventEmitter<boolean>();

  private scrollContainer: any;
  private slowEnabled: boolean;
  //@Input() resultGach: string[]; //Passed to us from gacha-ui [resultGach] = "resultGach"

  resultGach: string[];
  @Input() currResultGach: string[]; //Passed to us from gacha-ui represents latest gacha results.
  timeInterval: number; //time between each interval update

  constructor() {
    this.slowEnabled = false;
    this.resultGach = [];
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());
  }

  sendSlowModeStatus(){
    this.slowModeStatus.emit(this.slowEnabled);
  }

  // Push the results to the array that is displayed on screen either slow or fast
  // Depends on what user toggled.
  public gachPushResults() {
    let i = 0;
    let stopIndex: number;
    let interval = this.timeInterval

    if (this.slowEnabled == false) {
      //Hacky workaround to give currResultGach time to be passed from gacha-UI. without this, 
      // it gives the list from the last gach batch. 
      setTimeout(() => { this.resultGach = this.resultGach.concat(this.currResultGach); }, 600);
    }
    else if (this.slowEnabled == true) {


      let thisUpdater = setInterval(() => {
        stopIndex = this.currResultGach.length;
        let resultToPush = this.currResultGach[i];
        this.resultGach.push(resultToPush);
        i = i + 1;

        if (i == stopIndex) {
          clearInterval(thisUpdater); //Stops the continual updating on intervals when this is called
          resultToPush = ""; //If it's pushing empty string, it's not actually updating so scroll doesn't get called.
        }
      }, interval); //If slowmode slider is toggled, the time interval shortens
    }

  }

  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
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

import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

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

  // Push the results to the array that is displayed on screen either slow or fast
  // Depends on what user toggled.
  public gachPushResults(){
    let i = 0;
    let stopIndex: number;
    let interval = this.timeInterval
    let thisUpdater = setInterval(() => {
      stopIndex = this.currResultGach.length; 
      this.resultGach.push(this.currResultGach[i]);
      i = i+ 1;
      
      if(i == stopIndex){
        clearInterval(thisUpdater); //Stops the continual updating on intervals when this is called
      }
    }, interval); //If slowmode slider is toggled, the time interval shortens
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
  public toggleSlowMode(){
    this.slowEnabled = !this.slowEnabled;
    if(this.slowEnabled == true){
      this.timeInterval = 500; //500ms
    }else{
      this.timeInterval = 1; //instant almost 
    }
  }

  /*--AutoScroll from this tutorial: 
  https://pumpingco.de/blog/automatic-scrolling-only-if-a-user-already-scrolled-the-bottom-of-a-page-in-angular/ 
  */
}

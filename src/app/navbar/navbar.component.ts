import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { GachaponComponent } from '../gachapon/gachapon.component';
import { LootComponent } from '../loot/loot.component';
import { AboutComponent } from '../about/about.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  //DEFAULT COMPONENT
  dummyComponent = GachaponComponent;

  constructor(private breakpointObserver: BreakpointObserver) {}

  assignComponent(component){
    if(component=='loot'){
      console.log("Let's show loot!");
      this.dummyComponent= LootComponent;
    }
    else if(component == "gacha"){
      console.log("Let's gacha");
      this.dummyComponent= GachaponComponent;
    }
    else if(component == "about"){
      console.log("Let's show the about page!");
      this.dummyComponent= AboutComponent;
    }
  }

}

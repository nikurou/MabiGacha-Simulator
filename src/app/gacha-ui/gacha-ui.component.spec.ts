import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GachaUIComponent } from './gacha-ui.component';

describe('GachaUIComponent', () => {
  let component: GachaUIComponent;
  let fixture: ComponentFixture<GachaUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GachaUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GachaUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

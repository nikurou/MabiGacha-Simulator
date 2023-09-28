import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GachaUIComponent } from './gacha-ui.component';

describe('GachaUIComponent', () => {
  let component: GachaUIComponent;
  let fixture: ComponentFixture<GachaUIComponent>;

  beforeEach(waitForAsync(() => {
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

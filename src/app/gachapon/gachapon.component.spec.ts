import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GachaponComponent } from './gachapon.component';

describe('GachaponComponent', () => {
  let component: GachaponComponent;
  let fixture: ComponentFixture<GachaponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GachaponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GachaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

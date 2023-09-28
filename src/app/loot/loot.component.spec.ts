import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LootComponent } from './loot.component';

describe('LootComponent', () => {
  let component: LootComponent;
  let fixture: ComponentFixture<LootComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

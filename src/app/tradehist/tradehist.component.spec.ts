import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradehistComponent } from './tradehist.component';

describe('TradehistComponent', () => {
  let component: TradehistComponent;
  let fixture: ComponentFixture<TradehistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradehistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradehistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

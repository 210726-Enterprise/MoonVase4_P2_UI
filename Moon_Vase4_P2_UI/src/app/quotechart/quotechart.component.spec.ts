import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotechartComponent } from './quotechart.component';

describe('QuotechartComponent', () => {
  let component: QuotechartComponent;
  let fixture: ComponentFixture<QuotechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

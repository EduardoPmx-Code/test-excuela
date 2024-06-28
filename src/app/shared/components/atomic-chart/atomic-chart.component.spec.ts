import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomicChartComponent } from './atomic-chart.component';

describe('AtomicChartComponent', () => {
  let component: AtomicChartComponent;
  let fixture: ComponentFixture<AtomicChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtomicChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtomicChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

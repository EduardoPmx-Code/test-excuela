import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomicVideoComponent } from './atomic-video.component';

describe('AtomicVideoComponent', () => {
  let component: AtomicVideoComponent;
  let fixture: ComponentFixture<AtomicVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtomicVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtomicVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomicChatRoomComponent } from './atomic-chat-room.component';

describe('AtomicChatRoomComponent', () => {
  let component: AtomicChatRoomComponent;
  let fixture: ComponentFixture<AtomicChatRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtomicChatRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtomicChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

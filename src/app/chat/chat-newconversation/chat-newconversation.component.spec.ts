import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNewconversationComponent } from './chat-newconversation.component';

describe('ChatNewconversationComponent', () => {
  let component: ChatNewconversationComponent;
  let fixture: ComponentFixture<ChatNewconversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatNewconversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatNewconversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

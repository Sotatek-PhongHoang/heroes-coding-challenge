
import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('Weapon service', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('Init message service', () => {
    expect(service).toBeTruthy();
  });

  it('Add a new message', () => {
    const newMessage = 'New message';
    service.add(newMessage)
    expect(service.messages[service.messages.length - 1]).toEqual(newMessage);
  });

  it('Clear all message', () => {
    service.clear();
    expect(service.messages.length).toEqual(0);
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { ConversationsService } from './conversations.service';

describe('ConversationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversationsService]
    });
  });

  it('should ...', inject([ConversationsService], (service: ConversationsService) => {
    expect(service).toBeTruthy();
  }));
});

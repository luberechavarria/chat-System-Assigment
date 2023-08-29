import { TestBed } from '@angular/core/testing';

import { usersChannelsService } from './usersChannels.service ';

describe('userChannels', () => {
  let service: usersChannelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(usersChannelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GroupsService } from './groups.service';

describe('Groups', () => {
  let service: GroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ResponsiveToolbarService } from './responsive-toolbar.service';

describe('ResponsiveToolbarService', () => {
  let service: ResponsiveToolbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsiveToolbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

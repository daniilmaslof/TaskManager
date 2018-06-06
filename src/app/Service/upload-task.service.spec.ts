import { TestBed, inject } from '@angular/core/testing';

import { UploadTaskService } from './upload-task.service';

describe('UploadTaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadTaskService]
    });
  });

  it('should be created', inject([UploadTaskService], (service: UploadTaskService) => {
    expect(service).toBeTruthy();
  }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcardDialogComponent } from './jobcard-dialog.component';

describe('JobcardDialogComponent', () => {
  let component: JobcardDialogComponent;
  let fixture: ComponentFixture<JobcardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobcardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobcardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

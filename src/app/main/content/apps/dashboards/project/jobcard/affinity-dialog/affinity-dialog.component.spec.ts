import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffinityDialogComponent } from './affinity-dialog.component';

describe('AffinityDialogComponent', () => {
  let component: AffinityDialogComponent;
  let fixture: ComponentFixture<AffinityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffinityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffinityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

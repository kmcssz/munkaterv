import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcurrentTervekComponent } from './concurrent-tervek.component';

describe('ConcurrentTervekComponent', () => {
  let component: ConcurrentTervekComponent;
  let fixture: ComponentFixture<ConcurrentTervekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcurrentTervekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcurrentTervekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

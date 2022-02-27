import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsapatSelectionComponent } from './csapat-selection.component';

describe('CsapatSelectionComponent', () => {
  let component: CsapatSelectionComponent;
  let fixture: ComponentFixture<CsapatSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsapatSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsapatSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

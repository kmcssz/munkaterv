import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsapatTervComponent } from './csapat-terv.component';

describe('CsapatTervComponent', () => {
  let component: CsapatTervComponent;
  let fixture: ComponentFixture<CsapatTervComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsapatTervComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsapatTervComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

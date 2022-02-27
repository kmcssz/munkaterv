import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsapatTervekComponent } from './csapat-tervek.component';

describe('CsapatTervComponent', () => {
  let component: CsapatTervekComponent;
  let fixture: ComponentFixture<CsapatTervekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsapatTervekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsapatTervekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

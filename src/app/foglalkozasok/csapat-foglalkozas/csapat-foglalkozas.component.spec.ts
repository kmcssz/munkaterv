import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsapatFoglalkozasComponent } from './csapat-foglalkozas.component';

describe('CsapatProgramComponent', () => {
  let component: CsapatFoglalkozasComponent;
  let fixture: ComponentFixture<CsapatFoglalkozasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsapatFoglalkozasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsapatFoglalkozasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsapatProgramComponent } from './csapat-program.component';

describe('CsapatProgramComponent', () => {
  let component: CsapatProgramComponent;
  let fixture: ComponentFixture<CsapatProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsapatProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsapatProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

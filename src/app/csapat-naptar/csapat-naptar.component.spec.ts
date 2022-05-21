import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsapatNaptarComponent } from './csapat-naptar.component';

describe('CsapatTervComponent', () => {
  let component: CsapatNaptarComponent;
  let fixture: ComponentFixture<CsapatNaptarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsapatNaptarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsapatNaptarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

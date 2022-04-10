import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RajTervComponent } from './raj-terv.component';

describe('RajProgramComponent', () => {
  let component: RajTervComponent;
  let fixture: ComponentFixture<RajTervComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RajTervComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RajTervComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

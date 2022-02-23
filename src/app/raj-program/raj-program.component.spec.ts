import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RajProgramComponent } from './raj-program.component';

describe('RajProgramComponent', () => {
  let component: RajProgramComponent;
  let fixture: ComponentFixture<RajProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RajProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RajProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

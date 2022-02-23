import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsiProgramComponent } from './orsi-program.component';

describe('ProgramComponent', () => {
  let component: OrsiProgramComponent;
  let fixture: ComponentFixture<OrsiProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrsiProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsiProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

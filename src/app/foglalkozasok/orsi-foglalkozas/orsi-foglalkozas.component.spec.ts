import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsiFoglalkozasComponent } from './orsi-foglalkozas.component';

describe('ProgramComponent', () => {
  let component: OrsiFoglalkozasComponent;
  let fixture: ComponentFixture<OrsiFoglalkozasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrsiFoglalkozasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsiFoglalkozasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

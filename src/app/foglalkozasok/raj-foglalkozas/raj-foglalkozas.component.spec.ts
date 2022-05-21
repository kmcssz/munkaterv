import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RajFoglalkozasComponent } from './raj-foglalkozas.component';

describe('RajProgramComponent', () => {
  let component: RajFoglalkozasComponent;
  let fixture: ComponentFixture<RajFoglalkozasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RajFoglalkozasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RajFoglalkozasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoglalkozasComponent } from './foglalkozas.component';

describe('FoglalkozasComponent', () => {
  let component: FoglalkozasComponent;
  let fixture: ComponentFixture<FoglalkozasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoglalkozasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoglalkozasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzemszogSelectionComponent } from './szemszog-selection.component';

describe('SzemszogSelectionComponent', () => {
  let component: SzemszogSelectionComponent;
  let fixture: ComponentFixture<SzemszogSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SzemszogSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SzemszogSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

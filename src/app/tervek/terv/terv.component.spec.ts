import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TervComponent } from './terv.component';

describe('TervComponent', () => {
  let component: TervComponent;
  let fixture: ComponentFixture<TervComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TervComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TervComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

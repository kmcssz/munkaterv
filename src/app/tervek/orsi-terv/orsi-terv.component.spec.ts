import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsiTervComponent } from './orsi-terv.component';

describe('OrsiTervComponent', () => {
  let component: OrsiTervComponent;
  let fixture: ComponentFixture<OrsiTervComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrsiTervComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsiTervComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

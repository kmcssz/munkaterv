import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunkatervComponent } from './munkaterv.component';

describe('MunkatervComponent', () => {
  let component: MunkatervComponent;
  let fixture: ComponentFixture<MunkatervComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunkatervComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunkatervComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

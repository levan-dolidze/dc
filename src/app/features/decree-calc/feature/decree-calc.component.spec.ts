import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecreeCalcComponent } from './decree-calc.component';

describe('DecreeCalcComponent', () => {
  let component: DecreeCalcComponent;
  let fixture: ComponentFixture<DecreeCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecreeCalcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecreeCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPaymentComponent } from './test-payment.component';

describe('TestPaymentComponent', () => {
  let component: TestPaymentComponent;
  let fixture: ComponentFixture<TestPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestPaymentComponent]
    });
    fixture = TestBed.createComponent(TestPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

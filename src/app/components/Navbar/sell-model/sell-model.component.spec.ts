import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellModelComponent } from './sell-model.component';

describe('SellModelComponent', () => {
  let component: SellModelComponent;
  let fixture: ComponentFixture<SellModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellModelComponent]
    });
    fixture = TestBed.createComponent(SellModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartStatusComponentComponent } from './cart-status-component.component';

describe('CartStatusComponentComponent', () => {
  let component: CartStatusComponentComponent;
  let fixture: ComponentFixture<CartStatusComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartStatusComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartStatusComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

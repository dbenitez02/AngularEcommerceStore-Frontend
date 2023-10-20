import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalCartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() { }

  addToCart(cartItem: CartItem) {

    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.totalCartItems.length > 0) {
      
      // Find item in cart based on cartId
      existingCartItem = this.totalCartItems.find(tempCartItem => tempCartItem.id === cartItem.id)!;

      alreadyExistInCart = (existingCartItem != undefined);
    }

    if (alreadyExistInCart) {
      existingCartItem.quantity++;
    }
    else {
      this.totalCartItems.push(cartItem);
    }

    this.computeCartTotal(this.totalCartItems);
  }

  computeCartTotal(cartItems: CartItem[]) {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // Debugging purposes
    console.log(`Contents`);
    for (let tempItem of this.totalCartItems) {
      console.log(`Name: ${tempItem.name}\nQuantity: ${tempItem.quantity}\nPrice: ${tempItem.unitPrice}\n-----`)
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}\ntotalQuantity: ${totalQuantityValue}`);
  }
}

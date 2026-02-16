import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: any[] = [];

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {}

  getItems() {
    return this.items;
  }

  addToCart(product: any) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    this.updateCartCount();
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
    this.updateCartCount();
  }

  clearCart() {
    this.items = [];
    this.updateCartCount();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  private updateCartCount() {
    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.next(count);
  }
}
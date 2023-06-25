import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: any[] = [];

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getCartItems();
  }

  checkOut() {
    this.auth.checkOut(this.cart).subscribe(
      res => console.log(res),
      error => {
        if (error.status === 401) {
          this.auth.showPromptForLoginOrRegister();
        }
      }
    );
  }

  updateQuantity(item: any, increase: boolean) {
    if (increase) {
      item.quantity = (item.quantity || 1) + 1;
    } else {
      item.quantity = Math.max((item.quantity || 0) - 1, 0);
      if (item.quantity === 0) {
        this.removeFromCart(item);
        return;
      }
    }
  
    this.cartService.updateCartItem(item);
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
    this.cart = this.cartService.getCartItems();
  }
}
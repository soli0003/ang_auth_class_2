import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit {
  cart: any[] = [];

  constructor(private cartService: CartService,
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
}

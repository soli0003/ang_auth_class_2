import { Component, Input } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ProdService } from '../Services/prod.service';
import { Router } from '@angular/router';
import { CartService } from '../Services/cart.service';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  title = 'myapp';
  myProducts: any[] = []
  mProducts: any[] = []
  @Input() cart: any[] = [];


  constructor(
    private prodSrv: ProdService,
    private auth: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.showData();
  }

  showData() {
    this.prodSrv.showProducts().subscribe(res => this.mProducts = res);
  }

  buy(price: number, desc: string, id: number) {
    const existingItem = this.cartService.getCartItemById(id);
    if (existingItem) {
      this.cartService.updateQuantity(existingItem, true);
    } else {
      const item = { amount: 1, desc, price, id };
      this.cartService.addToCart(item);
    }
  
    console.log(this.cartService.getCartItems());
  }

  

  add(price: number, desc: any) {
    this.prodSrv.addProduct({ price, desc }).subscribe(
      res => {
        console.log(res);
        this.showData();
      },
      error => {
        if (error.status === 401) {
          this.auth.showPromptForLoginOrRegister();
        }
      }
    );
  }

  del(id: number) {
    this.prodSrv.delProduct(id).subscribe(
      res => {
        console.log(res);
        this.showData();
      },
      error => {
        if (error.status === 401) {
          this.auth.showPromptForLoginOrRegister();
        }
      }
    );
  }

  upd(price: number, desc: string, id: number) {
    this.prodSrv.updProduct({ price, desc }, id).subscribe(
      res => {
        console.log(res);
        this.showData();
      },
      error => {
        if (error.status === 401) {
          this.auth.showPromptForLoginOrRegister();
        }
      }
    );
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

  login(pwd: string, user: string) {
    this.auth.login(pwd, user).subscribe(res => {
      localStorage.setItem('token', res.access);
    });
  }
}
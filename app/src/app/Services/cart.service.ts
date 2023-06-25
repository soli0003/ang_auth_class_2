import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: any[] = [];

    constructor(private http: HttpClient) { }
    URL = 'http://127.0.0.1:8000/ordrHistory';

    getCartItemById(id: number) {
        return this.cartItems.find((item: any) => item.id === id);
    }

    ordrHistory(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          });
        return this.http.get<any>(this.URL, { headers: headers });
    }

    addToCart(item: any) {
        const existingItem = this.getCartItemById(item.id);

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.cartItems.push(item);
        }
    }

    removeFromCart(item: any) {
        const index = this.cartItems.findIndex((cartItem: any) => cartItem.id === item.id);

        if (index !== -1) {
            this.cartItems.splice(index, 1);
        }
    }

    updateCartItem(item: any) {
        const existingItem = this.getCartItemById(item.id);

        if (existingItem) {
            existingItem.quantity = item.quantity;
        }
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

        this.updateCartItem(item);
    }

    getCartItems() {
        return this.cartItems;
    }
}

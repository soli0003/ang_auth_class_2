import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from './cart.service'; 
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) { }
  SERVER_URL = 'http://127.0.0.1:8000/';


  checkOut(cart: any[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(cart, "aaa");
    
    return this.http.post<any>(this.SERVER_URL + 'checkout', cart, { headers: headers });
  }


  login(pwd: string, user: string): Observable<any> {
    console.log({ username: user, password: pwd });

    return this.http.post<any>(this.SERVER_URL + "login", { username: user, password: pwd });
  }
  showPromptForLoginOrRegister() {
    Swal.fire({
      icon: 'error',
      title: 'Unauthorized',
      text: 'You need to login or register to perform this action.',
      showCancelButton: true,
      confirmButtonText: 'Login',
      cancelButtonText: 'Register'
    }).then((result) => {
    const currentURL = this.router.url;
      localStorage.setItem("backToURL", currentURL)
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      } else {
        localStorage.setItem("backToURL", currentURL)
        this.router.navigate(['/backToURL']);
      }
    });
  }
  
  register(username: string, password: string, last_name: string, first_name:string, email:string): Observable<any> {
    const url = 'http://127.0.0.1:8000/register';
    const body = { username, password,last_name,first_name,email };
    return this.http.post(url, body);
  }
}
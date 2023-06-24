import { Component } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
[x: string]: any;
  username: string = '';
  password: string = '';
  error: string = '';
firstname: any;

  constructor(private authService: AuthService, private router: Router) {}

  userLogin() {
    this.authService.login(this.password, this.username, )
      .subscribe(
        (res: any) => {
          const redirectBack = localStorage.getItem("backToURL")
            console.log(redirectBack);
          localStorage.setItem('token', res.access);
          Swal.fire('Success', 'Login successful', 'success');
          this.router.navigate([redirectBack]); // Replace '/' with the desired route
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Invalid username or password',
            text: 'Would you like to register instead?',
            showCancelButton: true,
            confirmButtonText: 'Register',
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/register']); // Replace '/register' with the desired route
            }
          });
        }
      );
  }
  redirectToRegister() {
    this.router.navigate(['/register']); // Replace '/register' with the desired route
  }
}

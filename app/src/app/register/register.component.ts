import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username!: string;
  password!: string;
  last_name!: string;
  first_name!: string;
  email!: string;

  constructor(private register_srv: AuthService) {}

  register() {
    this.register_srv.register(this.username, this.password, this.last_name, this.first_name, this.email)
      .subscribe(
        () => {
          Swal.fire('Success', 'Registration successful', 'success');
          // Redirect to another page or perform other actions
        },
        error => {
          Swal.fire('Error', 'An error occurred during registration', 'error');
        }
        );
    }
  }
import { Component } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  middleName = '';
  degree = '';
  position = '';
  experience = 1;

  constructor(private authService: AuthService, private router: Router) {
    console.log('registerUser method is called');
  }

  registerUser() {
    console.log('registerUser method is called');
    const userData = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      middleName: this.middleName,
      degree: this.degree,
      position: this.position,
      experience: this.experience
    };

    console.log(userData)

    this.authService.register(userData);
  }
}

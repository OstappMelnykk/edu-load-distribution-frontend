import { Component } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {IUser} from '../../../core/interfaces/user.interface';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    JsonPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public currentUser!: IUser
  constructor(private authService: AuthService) {

    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
    });
  }
}

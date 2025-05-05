import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RegistrationComponent {
  message: string = '';

  constructor() {}

  register(form: NgForm) {
    if (form.valid) {
      const userData = form.value;
      localStorage.setItem('user', JSON.stringify(userData));
      this.message = 'Registration successful!';
    } else {
      this.message = 'Please fill in all required fields correctly.';
    }
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  message: string = '';

  constructor(private router: Router) {}

  login(form: NgForm) {
    if (form.valid) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === form.value.email && user.password === form.value.password) {
          localStorage.setItem('isLoggedIn', 'true'); // Mark user as logged in
          this.router.navigate(['/profile']); // Navigate to profile page
        } else {
          this.message = 'Invalid email or password.';
        }
      } else {
        this.message = 'No user found. Please register first.';
      }
    } else {
      this.message = 'Please fill in all required fields correctly.';
    }
  }
}
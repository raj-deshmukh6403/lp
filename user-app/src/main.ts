import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RegistrationComponent } from './app/registration/registration.component';
import { LoginComponent } from './app/login/login.component';
import { ProfileComponent } from './app/profile/profile.component';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: RegistrationComponent }, // Default route (Registration)
      { path: 'login', component: LoginComponent },   // Login route
      { path: 'profile', component: ProfileComponent }, // Profile route
    ]),
  ],
}).catch(err => console.error(err));
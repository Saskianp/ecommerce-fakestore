import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder 
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.apiService.login(username, password).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('token', response.token); 
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          this.errorMessage = 'Login gagal. Periksa username dan password Anda.';
          console.error(err); 
        }
      });
    } else {
      this.errorMessage = 'Silakan isi semua field.';
    }
  }
}
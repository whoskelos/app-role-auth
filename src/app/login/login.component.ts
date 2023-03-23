import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  userData: any;

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      this.authService.getByCode(this.loginForm.value.username)
        .subscribe({
          next: (v) => {
            this.userData = v;
            if (this.userData.password === this.loginForm.value.password) {
              if (this.userData.isActive) {
                sessionStorage.setItem('username',this.userData.id);
                sessionStorage.setItem('userRole',this.userData.role);
                this.router.navigateByUrl('');
              } else {
                this.toastr.error('Please contact admin', 'In active user');
              }
            } else {
              this.toastr.error('Something happens', 'Invalid credentials');
            }
          },
          error: (e) => {
            this.toastr.error('Something happen', 'Please check the form');
          }
        })
    } else {
      //notification
      this.toastr.warning('Please enter a valid data');
    }
  }
}

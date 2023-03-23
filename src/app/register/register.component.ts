import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) {

  }

  registerForm = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isActive: this.builder.control(false),

  });

  proceedRegistration() {
    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value)
        .subscribe({
          next: (v) => {
            this.toastr.success('Please contact admin for enable access',`Register successfully!`);
            this.router.navigateByUrl('/login');
          },
          error: (e) => {
            this.toastr.error('Something happen','Please check the form');
          }
        }
        )
    } else {
      //notification
      this.toastr.warning('Please enter a valid data');
    }
  }

}

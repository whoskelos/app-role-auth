import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {
  
  roleList:any;

  constructor(private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    public bsModalRef: BsModalRef) {

  }

  
  ngOnInit(): void {
    this.authService.getAllRoles()
      .subscribe({
        next: (v) => {
          this.roleList = v;
        }
      });
  }
  

  updateForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('',Validators.required),
    isActive: this.builder.control(false),
  });

  proceedUpdate() {
    
  }

}

import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent {
  modalRef?: BsModalRef;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService) {
    this.loadUser();
  }

  userList: any;
  username: any;
  loadUser() {
    this.authService.getAll()
      .subscribe({
        next: (v) => {
          this.userList = v;
        }
      });
  }

  updateUser(id: any) {
    this.modalRef = this.modalService.show(UpdatePopupComponent, {
      keyboard:true,
    });
  }

}

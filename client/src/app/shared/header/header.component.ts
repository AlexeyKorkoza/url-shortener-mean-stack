import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from "../services/authentication.service";
import { User } from "../models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(
      private authenticationService: AuthenticationService,
      private router: Router) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
        userData => {
          this.currentUser = userData;
        }
    )
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

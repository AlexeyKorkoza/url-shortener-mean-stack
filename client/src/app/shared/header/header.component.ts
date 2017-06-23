import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from "../services/authentication.service";
import { User } from "../models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
        userData => {
          this.currentUser = userData;
        }
    )
  }

  logout() {
    this.authenticationService.logout();
  }
}

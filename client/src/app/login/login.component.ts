import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { User } from "../shared/models/user.model";
import { AuthenticationService } from "../shared/services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  loginForm: any;
  message: string;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService) {
      this.loginForm = formBuilder.group({
      'email': ['', [<any>Validators.required]],
      'password': ['', [<any>Validators.required]]
    })
  }

  login(user: User) {
      this.message = "";
      this.authenticationService.login(user).subscribe(
          () => {
              this.router.navigateByUrl('/');
          },
          err => {
              this.message = err._body;
          }
      )
  }

}

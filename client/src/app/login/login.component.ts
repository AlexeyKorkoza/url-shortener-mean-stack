import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../shared/models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: any;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router) {
      this.loginForm = formBuilder.group({
      'username': ['', [<any>Validators.required]],
      'email': ['', [<any>Validators.required, <any>Validators.email]],
      'password': ['', [<any>Validators.required, <any>Validators.minLength(6)]]
    })
  }

  login(user: User) {

  }

}

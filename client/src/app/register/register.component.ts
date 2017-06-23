import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent {

    registerForm: any;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router) {
        this.registerForm = formBuilder.group({
            'username': ['', [<any>Validators.required]],
            'email': ['', [<any>Validators.required, <any>Validators.email]],
            'password': ['', [<any>Validators.required, <any>Validators.minLength(6)]]
        })
    }

    register(user: User) {
        this.userService.create(user).subscribe(
            data => {
                console.log(data);
                this.router.navigateByUrl('/');
            }
        );
    }

}

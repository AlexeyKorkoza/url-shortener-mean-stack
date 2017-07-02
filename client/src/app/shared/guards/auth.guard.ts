import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { JwtService } from '../services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private router: Router ) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.jwtService.getToken()) {
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }
}

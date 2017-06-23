import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from '../models/user.model';

import { AppConfig } from "../app.config";

@Injectable()
export class UserService {

  constructor(
      private http: Http,
      private appConfig: AppConfig) {}

  create(user: User) {
    return this.http.post(this.appConfig.urlServer + "/user/create", user)
        .map((res: Response) => res.json())
  }
}

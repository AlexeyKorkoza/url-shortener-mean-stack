import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { AppConfig } from '../app.config';
import { JwtService } from './jwt.service';
import { Url } from '../models/url.model';

@Injectable()
export class UrlService {

  constructor(
      private http: Http,
      private appConfig: AppConfig,
      private jwtService: JwtService) { }

  create(url: Url) {
    let headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.post(this.appConfig.urlServer + '/urls/create', url, { headers: headers })
        .map((res: Response) => res.json());
  }

}

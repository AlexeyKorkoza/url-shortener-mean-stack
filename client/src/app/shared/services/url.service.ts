import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Url } from '../models/url.model';

@Injectable()
export class UrlService {

  constructor(
      private http: Http,
      private appConfig: AppConfig) { }

  create(url: Url) {
    return this.http.post(this.appConfig.urlServer + '/urls/create', url)
        .map((res: Response) => res.json());
  }

}

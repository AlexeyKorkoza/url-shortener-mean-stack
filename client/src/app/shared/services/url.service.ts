import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';

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
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.post(this.appConfig.urlServer + '/urls/create', url, { headers: headers })
        .map((res: Response) => res.json());
  }

  getUrls() {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.get(this.appConfig.urlServer + '/urls', { headers: headers })
        .map((res: Response) => res.json());
  }

  getStatsByUsername() {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.get(this.appConfig.urlServer + '/urls/stats', { headers: headers })
        .map((res: Response) => res.json());
  }

  updateCountClick(id: number, count_click: number) {
    console.log(count_click);
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.put(this.appConfig.urlServer + '/urls/count/' + id, {count_click: count_click }, { headers: headers })
        .map((res: Response) => res.json());
  }

  getUrlById(id: string) {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.get(this.appConfig.urlServer + '/urls/' + id, { headers: headers })
        .map((res: Response) => res.json());
  }

  updateUrlById(id: string, url: Url) {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.put(this.appConfig.urlServer + '/urls/' + id, url, { headers: headers })
        .map((res: Response) => res.json());
  }

  getUrlByIdForGuest(id: string) {

    return this.http.get(this.appConfig.urlServer + '/urls/quest/' + id)
        .map((res: Response) => res.json());
  }

}

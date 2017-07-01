import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Url } from '../shared/models/url.model';
import { UrlService } from '../shared/services/url.service';
import { JwtService } from '../shared/services/jwt.service';

@Component({
  selector: 'app-info-url',
  templateUrl: 'info-url.component.html',
  styleUrls: ['info-url.component.scss']
})
export class InfoUrlComponent implements OnInit {

  url: Url;
  edit: boolean = false;
  filter_tag: string;

  constructor(
      private urlService: UrlService,
      private jwtService: JwtService,
      private route: ActivatedRoute) {}

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (this.jwtService.getToken()) {
        this.urlService.getUrlById(id).subscribe(
            data => {
                this.url = data.url;
                this.edit = data.edit;
            }
        )
    } else {
        this.urlService.getUrlByIdForGuest(id).subscribe(
            data => {
                this.url = data.url;
                this.edit = data.edit;
            }
        )
    }
  }

  nameOfTag(tag: string) {
      this.filter_tag = tag;
  }

}

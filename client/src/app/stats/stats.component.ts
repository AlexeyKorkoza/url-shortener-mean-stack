import { Component, OnInit } from '@angular/core';

import { Url } from '../shared/models/url.model';
import { UrlService } from '../shared/services/url.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  urls: Url [];
  urlLoaded = false;
  urlsCount: number;
  username: String;

  constructor(private urlService: UrlService) { }

  ngOnInit() {
    this.urlService.getStatsByUsername().subscribe(
        data => {
          this.urls = data.urls;
          this.urlsCount = data.urlsCount;
          this.urlLoaded = true;
          this.username = this.urls[0].author;
        }
    )
  }

}

import { Component, OnInit } from '@angular/core';

import { UrlService } from '../shared/services/url.service';
import { Url } from '../shared/models/url.model';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

    urls: Url[];
    message: string;
    urlsLoaded = false;

    constructor(private urlService: UrlService) {}

    ngOnInit() {
        this.urlService.getUrls().subscribe(
            data => {
                this.urls = data.urls;
                this.urlsLoaded = true;
            },
            err => {
                this.message = err;
            }
        )
    }

    updateCountClick(id: number, count_click: number, short_url: string) {
        this.urlService.updateCountClick(id, count_click).subscribe(
            () => {
                setTimeout(() => {
                    window.location.href = short_url;
                }, 2000 );
            }
        )
    }

}

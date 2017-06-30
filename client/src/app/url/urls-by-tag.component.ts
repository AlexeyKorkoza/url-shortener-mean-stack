import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Url } from '../shared/models/url.model';
import { UrlService } from '../shared/services/url.service';

@Component({
  selector: 'app-urls-by-tag',
  templateUrl: 'urls-by-tag.component.html',
  styleUrls: ['urls-by-tag.component.scss']
})
export class UrlsByTagComponent implements OnChanges {

  @Input() filter_tag;
  urls: Url [];

  constructor(private urlService: UrlService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter_tag'] && this.filter_tag != undefined) {
        this.urlService.getUrls().subscribe(
            data => {
              this.urls = this.filterData(data.urls, this.filter_tag);
            }
        );
    }
  }

  filterData(obj: any, tag: string) :any {
    let results: any [] = [];
    for( var i = 0; i < obj.length; i++){

      for( var j = 0; j < obj[i].list_tags.length; j++)

        if (obj[i].list_tags[j] == tag) {
          results.push(obj[i]);
        }
    }
    return results;
  }

}

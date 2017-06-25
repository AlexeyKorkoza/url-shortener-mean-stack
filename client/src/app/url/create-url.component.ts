import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { Url } from "../shared/models/url.model";
import { UrlService } from "../shared/services/url.service";

@Component({
  selector: 'app-create-url',
  templateUrl: './create-url.component.html',
  styleUrls: ['create-url.component.scss']
})
export class CreateUrlComponent {

  createUrlForm: any;

  constructor(
      private formBuilder: FormBuilder,
      private urlService: UrlService) {
      this.createUrlForm = formBuilder.group({
      "full_url": ['', [Validators.required, Validators.pattern('https?://.+')]],
      "tag": ['', [Validators.required]],
      "description": ['', [Validators.required]]
    })
  }

  create(url: Url) {
      this.urlService.create(url).subscribe();
  }

}

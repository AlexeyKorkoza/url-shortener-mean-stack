import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { Url } from "../shared/models/url.model";
import { UrlService } from "../shared/services/url.service";

@Component({
  selector: 'app-create-url',
  templateUrl: './create-url.component.html',
  styleUrls: ['create-url.component.scss']
})
export class CreateUrlComponent {

  createUrlForm: any;
  message: string;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private urlService: UrlService) {
      this.createUrlForm = formBuilder.group({
      "full_url": ['', [Validators.required, Validators.pattern('https?://.+')]],
      "list_tags": ['', [Validators.required, Validators.pattern('([a-zA-Z]{1,},){1,}')]],
      "description": ['', [Validators.required]]
    })
  }

  create(url: Url) {
      this.urlService.create(url).subscribe(
          data => {
              this.message = data;
              setTimeout(() => {
                  this.router.navigateByUrl('/');
              }, 2000);
          }
      );
  }

}

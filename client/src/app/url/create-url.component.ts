import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-url',
  templateUrl: './create-url.component.html',
  styleUrls: ['create-url.component.scss']
})
export class CreateUrlComponent {

  createUrlForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.createUrlForm = formBuilder.group({
      "url": [null, Validators.required],
      "tag": [null, Validators.required],
      "description": [null, Validators.required]
    })
  }

  create() {

  }

}

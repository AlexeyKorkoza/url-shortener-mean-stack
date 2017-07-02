import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Directive({
    selector: '[showAuthed]'
})

export class ShowAuthedDirective implements OnInit {

    isAuthenticated: boolean;

    constructor(
        private templateRef: TemplateRef<any>,
        private authenticationService: AuthenticationService,
        private viewContainer: ViewContainerRef) {}


    ngOnInit() {
        this.authenticationService.isAuthenticated.subscribe(
            (isAuthenticated) => {
                if (!isAuthenticated && !this.isAuthenticated || isAuthenticated && this.isAuthenticated) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            }
        );
    }

    @Input() set showAuthed(isAuthenticated: boolean) {
        this.isAuthenticated = isAuthenticated;
    }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { CreateUrlComponent } from './url/create-url.component'
import { InfoUrlComponent } from './url/info-url.component';

import { AppConfig } from './shared/app.config';

import { UserService } from './shared/services/user.service';
import { AuthenticationService } from "./shared/services/authentication.service";
import { JwtService } from "./shared/services/jwt.service";
import { UrlService } from "./shared/services/url.service";

import { ShowAuthedDirective } from './shared/directive/auth.directive';
import { StatsComponent } from './stats/stats.component';
import { EditInfoUrlComponent } from './url/edit-info-url.component';
import { UrlsByTagComponent } from './url/urls-by-tag.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateUrlComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'url/:id', component: InfoUrlComponent},
  { path: 'url/:id/edit', component: EditInfoUrlComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    ShowAuthedDirective,
    CreateUrlComponent,
    StatsComponent,
    InfoUrlComponent,
    EditInfoUrlComponent,
    UrlsByTagComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    AuthenticationService,
    JwtService,
    UrlService,
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
// Heroes component importing from component we just generated, does this get imported in the module automatically when I create the component
import { HeroesComponent } from './heroes/heroes.component';
//  NgModel lives here in Forms Module
import { FormsModule } from '@angular/forms';

import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadButtonComponent } from './upload-button/upload-button.component';

import { HttpClientModule } from '@angular/common/http';



// AppModule declares both application components, AppComponent and Heroes Component
@NgModule({
  declarations: [
    AppComponent,
    // and here?
    HeroesComponent,
    // "ng generate componentName" adds the HeroDetailComponent as a declaration in the @NgModule decorator of the src/app/app.module.ts file
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    UploadButtonComponent
  
  ],
  //  add FormModule to the @NGModule metadata's imports array, which contains a list of external modules that the app needs
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    FormsModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

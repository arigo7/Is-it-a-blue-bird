import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
// Heroes component importing from component we just generated, does this get imported in the module automatically when I create the component
import { HeroesComponent } from './heroes/heroes.component';
//  NgModel lives here in Forms Module
import { FormsModule } from '@angular/forms';

import { HeroDetailComponent } from './hero-detail/hero-detail.component';
// import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadButtonComponent } from './upload-button/upload-button.component';

// to be able to upload file (upload-button.component.ts) - through HttpClient - need to enable the module first here at NgModules
import { HttpClientModule } from '@angular/common/http';
import { AnalyzeButtonComponent } from './analyze-button/analyze-button.component';



// AppModule declares both application components, AppComponent and Heroes Component
@NgModule({
  // declarations property app module
  declarations: [
    AppComponent,
    // and here?
    HeroesComponent,
    // "ng generate componentName" adds the HeroDetailComponent as a declaration in the @NgModule decorator of the src/app/app.module.ts file
    HeroDetailComponent,
    // MessagesComponent,
    DashboardComponent,
    UploadButtonComponent,
    AnalyzeButtonComponent
  
  ],
  // imports property: other modules whose exported classes are needed by component templates are declared here
  //  add FormModule to the @NGModule metadata's imports array, which contains a list of external modules that the app needs
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule. with this Http can be injected into any service/component where we want to use it (reccomended to create a service for this)
    HttpClientModule,
    FormsModule,
    AppRoutingModule

  ],
  // creators of services that this NgModule contributes to the global collection of services  - they become accessible in all parts of app. Its preferred to specify providers at component level
  providers: [],
  // main app view (root component) - hosts all app views. Only NgModule should set bootstrap property
  bootstrap: [AppComponent]
})
export class AppModule { }

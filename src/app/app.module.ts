import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Heroe's component importing from component we just generated, does this get imported in the module automatically when I create the component
import { HeroesComponent } from './heroes/heroes.component';
//  NgModel lives here in Forms Module
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component'; 

// AppModule declares both application components, AppComponent and Heroes Component
@NgModule({
  declarations: [
    AppComponent,
    // and here?
    HeroesComponent,
    // "ng generate componentName" adds the HeroDetailComponent as a declaration in the @NgModule decorator of the src/app/app.module.ts file
    HeroDetailComponent
  ],
  //  add FormModule to the @NGModule metadata's imports array, which contains a list of external modules that the app needs
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

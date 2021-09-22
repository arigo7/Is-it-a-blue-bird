// app-routing.module.ts serves as a means to specify which component should be  shown or which module should be loaded when user navigates to URL path either directly or by means of actions like clicking a button

import { NgModule } from '@angular/core';

// First, the app-routing.module.ts file imports RouterModule and Routes so the application can have routing functionality
import { RouterModule, Routes } from '@angular/router';

// HeroesComponent, will give the Router somewhere to go once  routes are configured
import { HeroesComponent } from './heroes/heroes.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// next part of the file is where routes get configured 
// Routes tell the Router which view to display user clicks a link or pastes a URL into the browser address bar

// a typical Route has properties: path (URL) and component (that router should create when going to route (URL))

// another way of putting it - Routes array - is the mapping of which component or module should be loaded when user navigates to URL path either directly or clicking on button - this array objects have properties like path, component, loadChildren
const routes: Routes = [
  // makes the application navigate to the dashboard automatically
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  //  add to routes array a route matching a path to DashboardComponent
  { path: 'dashboard', component: DashboardComponent},

  { path: 'detail/:id', component: HeroDetailComponent},

  { path: 'heroes', component: HeroesComponent }
  
];

// NgModule metadata initializes router and starts listening for browser location changes
@NgModule({
  //  adds RouterModule to AppRoutingModule imports array and configures it with the routes by calling RouterModule.forRoot()
//  called forRoot() bc router is configured at the apps root level
  imports: [ RouterModule.forRoot(routes) ],
  // exporting the RouterModule makes it available throughout the app
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

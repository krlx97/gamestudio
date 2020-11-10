import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatIconRegistry} from '@angular/material/icon/'
import {ServiceWorkerModule} from '@angular/service-worker'

import {HeaderModule} from './header/header.module'
import {MaterialModule} from './material/material.module'
import {MenusModule} from './menus/menus.module'
import {ViewsModule} from './views/views.module'
import {ViewsRoutingModule} from './views/views-routing.module'

import {AppComponent} from './app.component'

import {environment} from '../environments/environment'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    HeaderModule,
    MaterialModule,
    MenusModule,
    ViewsModule,
    ViewsRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly _matIconRegistry:MatIconRegistry) {
    this._matIconRegistry.registerFontClassAlias('fontawesome', 'fa')
  }
}

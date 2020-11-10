import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'

import {MaterialModule} from '../material/material.module'

import {HeaderComponent} from './header.component'
import {UserComponent} from './user/user.component'
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {SearchComponent} from './search/search.component'
import {InfoComponent} from './info/info.component'

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    SearchComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
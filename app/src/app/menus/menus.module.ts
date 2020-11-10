import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'

import {MaterialModule} from '../material/material.module'

import {MenusComponent} from './menus.component'
import {MenuComponent} from './menu/menu.component'
import {AddMenuComponent} from './admin/add-menu/add-menu.component'
import {EditMenuComponent} from './admin/edit-menu/edit-menu.component'
import {RemoveMenuComponent} from './admin/remove-menu/remove-menu.component'

@NgModule({
  declarations: [
    MenusComponent,
    MenuComponent,
    AddMenuComponent,
    EditMenuComponent,
    RemoveMenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  exports: [MenusComponent]
})
export class MenusModule {}

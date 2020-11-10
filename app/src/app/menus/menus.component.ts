import {Component, OnInit, OnDestroy, Input} from '@angular/core'
import {MatSidenav} from '@angular/material/sidenav'
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar'

import {AddMenuComponent} from './admin/add-menu/add-menu.component'
import {EditMenuComponent} from './admin/edit-menu/edit-menu.component'
import {RemoveMenuComponent} from './admin/remove-menu/remove-menu.component'

import {MenuService} from '../shared/menu/menu.service'
import {SocketService} from '../shared/socket/socket.service'
import {UserService} from '../shared/user/user.service'

import {Menu} from '../shared/models/menu.model'

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit, OnDestroy {
  @Input() readonly appSidenav:MatSidenav
  private readonly _responses:any

  constructor(
    private readonly _matDialog:MatDialog,
    private readonly _matSnackBar:MatSnackBar,
    readonly menuService:MenuService,
    private readonly _socketService:SocketService,
    readonly userService:UserService
  ) {
    this._responses = {
      addMenuRes: (menu:Menu):void => {
        const {_matSnackBar, menuService, userService} = this

        menuService.add(menu)

        if (userService.isAdmin) {
          _matSnackBar.open('Meni je uspešno dodat', 'OK', {duration: 7000})
        }
      },
      editMenuRes: (modifiedMenu:Menu):void => {
        const {_matSnackBar, menuService, userService} = this

        menuService.findAndEdit(modifiedMenu)

        if (userService.isAdmin) {
          _matSnackBar.open('Meni je uspešno izmenjen', 'OK', {duration: 7000})
        }
      },
      getMenusRes: (menus:Menu[]):void => {
        menuService.menus = menus
        menuService.getCollections()
      },
      removeMenuRes: (_id:string):void => {
        const {_matSnackBar, menuService, userService} = this

        menuService.findAndRemove(_id)

        if (userService.isAdmin) {
          _matSnackBar.open('Meni je uspešno uklonjen', 'OK', {duration: 7000})
        }
      }
    }
  }

  ngOnInit():void {
    this._socketService.listen(this._responses)
    this._socketService.emit('getMenus')
  }
  ngOnDestroy():void {
    this._socketService.forget(this._responses)
  }
  addMenu():void {
    this._matDialog.open(AddMenuComponent, {width: '320px'})
  }
  onEditMenu(menu:Menu):void {
    const config:MatDialogConfig = {width: '320px', data: {menu}}
    this._matDialog.open(EditMenuComponent, config)
  }
  onRemoveMenu(menuId:string):void {
    const config:MatDialogConfig = {width: '320px', data: {menuId}}
    this._matDialog.open(RemoveMenuComponent, config)
  }
}

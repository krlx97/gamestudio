import {Component, Input} from '@angular/core'
import {Router} from '@angular/router'
import {MatSidenav} from '@angular/material/sidenav'
import {MatDialog} from '@angular/material/dialog'

import {InfoComponent} from './info/info.component'
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {SearchComponent} from './search/search.component'
import {UserComponent} from './user/user.component'

import {DeviceService} from '../shared/device/device.service'
import {UserService} from '../shared/user/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() readonly appSidenav:MatSidenav

  constructor(
    private readonly _router:Router,
    private readonly _matDialog:MatDialog,
    readonly deviceService:DeviceService,
    readonly userService:UserService
  ) {}

  get menuIcon():string {
    const burgerIcon = 'fas fa-bars fa-fw'
    const closeIcon = 'fas fa-times fa-fw'

    return this.appSidenav.opened ? closeIcon : burgerIcon
  }

  get userIcon():string {
    const userIcon = 'fas fa-user fa-fw'
    const loginIcon = 'fas fa-sign-in-alt fa-fw'

    return this.userService.isLoggedIn ? userIcon : loginIcon
  }

  get userTitle():string {
    return this.userService.isLoggedIn ? 'Nalog' : 'Prijava'
  }

  userAction():void {
    this.userService.isLoggedIn ? this.account() : this.login()
  }

  get cartIcon():string {
    const cartIcon = 'fas fa-shopping-cart fa-fw'
    const registerIcon = 'fas fa-user-plus fa-fw'

    return this.userService.isLoggedIn ? cartIcon : registerIcon
  }

  get cartTitle():string {
    return this.userService.isLoggedIn ? 'Korpa' : 'Registracija'
  }

  cartAction():void {
    this.userService.isLoggedIn ? this.cart() : this.register()
  }

  account():void {
    this._matDialog.open(UserComponent, {width: '320px'})
  }

  login():void {
    this._matDialog.open(LoginComponent, {width: '320px'})
  }

  cart():void {
    this._router.navigate(['/cart'])
  }

  register():void {
    this._matDialog.open(RegisterComponent, {width: '320px'})
  }

  search():void {
    this._matDialog.open(SearchComponent, {width: '320px'})
  }

  info():void {
    this._matDialog.open(InfoComponent, {width: '320px'})
  }
}
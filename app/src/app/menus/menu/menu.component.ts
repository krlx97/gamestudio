import {Component, Input, Output, EventEmitter} from '@angular/core'
import {MatSidenav} from '@angular/material/sidenav'
import {DeviceService} from 'src/app/shared/device/device.service'
import {UserService} from 'src/app/shared/user/user.service'
import {Menu} from 'src/app/shared/models/menu.model'
import {Router} from '@angular/router'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() readonly appSidenav:MatSidenav
  @Input() readonly menu:Menu
  @Output() readonly editMenuEvt = new EventEmitter()
  @Output() readonly removeMenuEvt = new EventEmitter()

  constructor(
    private readonly _router:Router,
    private readonly _deviceService:DeviceService,
    readonly userService:UserService
  ) {}

  getMenuIcon():string {
    return `${this.menu.fontAwesome} fa-2x fa-fw`
  }
  getLinkUrl(collectionName:string):string[] {
    const lowercaseName = collectionName.split(' ').join('_').toLowerCase()
    return ['products', lowercaseName]
  }
  getLinkState(collection:string):{collection:string} {
    return {collection}
  }
  toggleSidenav():void {
    const {appSidenav, _deviceService} = this

    if (_deviceService.isMobile || _deviceService.isTablet) {
      appSidenav.toggle()
    }
  }
  editMenu():void {
    this.editMenuEvt.emit(this.menu)
  }
  removeMenu():void {
    this.removeMenuEvt.emit(this.menu._id)
  }
}

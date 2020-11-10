import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {SocketService} from '../socket/socket.service'
import {Menu} from '../models/menu.model'

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menus:Menu[]
  collections:string[]
  readonly menus$:Observable<Menu[]>

  constructor(socketService:SocketService) {
    this.menus = []
    this.collections = []

    // this.menus$ = new Observable((subscriber) => {
    //   socketService.onn('getMenusRes', (menus:Menu[]) => {
    //     this.menus = menus
    //     this.getCollections()
    //     subscriber.next(menus)
    //   })
    // })
  }

  getCollections():void {
    this.menus.forEach((menu) => {
      menu.categories.forEach((category) => {
        category.collections.forEach(({name}) => {
          this.collections.push(name)
        })
      })
    })
  }

  find(_id:string):number {
    for (let i = 0; i < this.menus.length; i += 1) {
      if (this.menus[i]._id === _id) {
        return i
      }
    }
  }

  add(menu:Menu):void {
    this.menus.push(menu)
  }

  findAndEdit(modifiedMenu:Menu):void {
    const i = this.find(modifiedMenu._id)
    this.menus[i] = modifiedMenu
  }

  findAndRemove(_id:string):void {
    const i = this.find(_id)
    this.menus.splice(i, 1)
  }
}

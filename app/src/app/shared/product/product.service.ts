import {Injectable} from '@angular/core'
import {Product} from '../models/product.model'
import { Observable } from 'rxjs'
import { SocketService } from '../socket/socket.service'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products:Product[]
  collection:string
  sortIcon:string
  products$:Observable<Product[]>

  constructor(socketService:SocketService) {
    this.products = []
    this.sortIcon = 'fas fa-sort fa-fw'

    this.products$ = new Observable((subscribe) => {
      socketService.onn('getProductsRes', (products:Product[]) => {
        subscribe.next(products)
      })
    })
  }

  find(_id:string):number {
    for (let i = 0; i < this.products.length; i += 1) {
      if (this.products[i]._id === _id) {
        return i
      }
    }
  }

  add(product:Product):void {
    if (product.collection === this.collection) {
      this.products.push(product)
    }
  }

  findAndRemove(deletedProduct:Product):void {
    if (deletedProduct.collection === this.collection) {
      const i = this.find(deletedProduct._id)
      this.products.splice(i, 1)
    }
  }

  findAndModify(editedProduct:Product):void {
    if (editedProduct.collection === this.collection) {
      const i = this.find(editedProduct._id)
      this.products[i] = editedProduct
    }
  }

  sortIncreasing():void {
    this.products.sort((a, b) => a.price - b.price)
    this.sortIcon = 'fas fa-sort-amount-up fa-fw'
  }

  sortDecreasing():void {
    this.products.sort((a, b) => b.price - a.price)
    this.sortIcon = 'fas fa-sort-amount-down fa-fw'
  }

  sortAZ():void {
    this.products.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()

      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      return 0
    })

    this.sortIcon = 'fas fa-sort-alpha-down fa-fw'
  }

  sortZA():void {
    this.products.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()

      if (nameB < nameA) {
        return -1
      }
      if (nameB > nameA) {
        return 1
      }

      return 0
    })

    this.sortIcon = 'fas fa-sort-alpha-up fa-fw'
  }
}

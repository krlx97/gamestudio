import {Injectable} from '@angular/core'
import {CartProduct} from '../models/cartProduct.model'

@Injectable({providedIn: 'root'})
export class CartProductService {
  cartProducts:CartProduct[]
  totalPrice:number

  constructor() {
    this.cartProducts = []
  }

  find(_id:string):number {
    for (let i = 0; i < this.cartProducts.length; i += 1) {
      if (this.cartProducts[i]._id === _id) {
        return i
      }
    }
  }

  decreaseQty(_id:string):void {
    const i = this.find(_id)
    this.cartProducts[i].qty -= 1
    this.getTotalPrice()
  }

  increaseQty(_id:string):void {
    const i = this.find(_id)
    this.cartProducts[i].qty += 1
    this.getTotalPrice()
  }

  removeFromCart(_id:string):void {
    const i = this.find(_id)
    this.cartProducts.splice(i, 1)
    this.getTotalPrice()
  }

  getTotalPrice():void {
    this.totalPrice = this.cartProducts.reduce((acc, cartProduct):number => {
      const {price, discount, qty} = cartProduct
      return acc + ((price - discount) * qty)
    }, 0)
  }
}

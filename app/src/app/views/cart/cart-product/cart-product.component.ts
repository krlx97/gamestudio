import {Component, Input, Output, EventEmitter} from '@angular/core'
import {CartProduct} from 'src/app/shared/models/cartProduct.model'
import {DeviceService} from 'src/app/shared/device/device.service'

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent {
  @Input() readonly cartProduct:CartProduct
  @Input() readonly isLoading:boolean
  @Output() readonly removeFromCartEvt = new EventEmitter()
  @Output() readonly increaseQtyEvt = new EventEmitter()
  @Output() readonly decreaseQtyEvt = new EventEmitter()

  constructor(readonly deviceService:DeviceService) {}

  get totalPrice():number {
    const {price, discount, qty} = this.cartProduct
    return (price - discount) * qty
  }

  get discount():number {
    const {price, discount} = this.cartProduct
    return price - discount
  }

  get percent():string {
    const {price, discount} = this.cartProduct
    return (discount / price * 100).toFixed()
  }

  decreaseQty():void {
    this.decreaseQtyEvt.emit(this.cartProduct._id)
  }

  increaseQty():void {
    this.increaseQtyEvt.emit(this.cartProduct._id)
  }

  removeFromCart():void {
    this.removeFromCartEvt.emit(this.cartProduct._id)
  }
}

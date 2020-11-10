import {Component, Input, Output, EventEmitter} from '@angular/core'
import {DeviceService} from 'src/app/shared/device/device.service'
import {UserService} from 'src/app/shared/user/user.service'
import {Product} from 'src/app/shared/models/product.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() readonly product:Product
  @Output() addToCartEvt = new EventEmitter()
  @Output() editProductEvt = new EventEmitter()
  @Output() removeProductEvt = new EventEmitter()

  constructor(
    readonly deviceService:DeviceService,
    readonly userService:UserService
  ) {}

  get discount():number {
    return this.product.price - this.product.discount
  }
  get percent():string {
    return (this.product.discount / this.product.price * 100).toFixed()
  }

  addToCart():void {
    this.addToCartEvt.emit(this.product)
  }
  editProduct():void {
    this.editProductEvt.emit(this.product)
  }
  removeProduct():void {
    this.removeProductEvt.emit(this.product)
  }
}

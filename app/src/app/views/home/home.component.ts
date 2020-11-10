import {Component, OnInit, OnDestroy} from '@angular/core'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {UserService} from 'src/app/shared/user/user.service'
import {Product} from 'src/app/shared/models/product.model'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  discountedProducts:Product[]
  private readonly _responses:any

  constructor(
    matSnackBar:MatSnackBar,
    private readonly _socketService:SocketService,
    private readonly _userService:UserService
    ) {
      this._responses = {
        addToCartRes(msg:string):void {
          matSnackBar.open(msg, 'OK', {duration: 7000})
        }
      }
    }

  ngOnInit():void {
    const {_socketService} = this

    _socketService.listen(this._responses)

    _socketService
      .on('getDiscountedProductsRes')
      .subscribe((discountedProducts:Product[]) => {
        this.discountedProducts = discountedProducts
      })

    _socketService.emit('getDiscountedProducts')
  }

  ngOnDestroy():void {
    this._socketService.forget(this._responses)
  }

  onAddToCart(product:Product):void {
    const {_socketService, _userService} = this
    const dbCollection = product.collection.split(' ').join('_').toLowerCase()
    const productId = product._id
    const {token} = _userService

    _socketService.emit('addToCart', {token, dbCollection, productId})
  }

  onEditProduct(product):void {}
  onRemoveProduct(_id):void {}
}

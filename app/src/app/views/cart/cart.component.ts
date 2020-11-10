import {Component, OnInit, OnDestroy} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {CheckoutComponent} from './checkout/checkout.component'
import {CartProductService} from 'src/app/shared/cart-product/cart-product.service'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {UserService} from 'src/app/shared/user/user.service'
import {CartProduct} from 'src/app/shared/models/cartProduct.model'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  isLoading = false
  private readonly _responses:any

  constructor(
    private readonly _matDialog:MatDialog,
    readonly cartProductService:CartProductService,
    private readonly _socketService:SocketService,
    private readonly _userService:UserService
  ) {
    this._responses = {
      decreaseQtyRes: (_id:string):void => {
        this.cartProductService.decreaseQty(_id)
        this.isLoading = false
      },
      getCartRes: (cartProducts:CartProduct[]):void => {
        this.cartProductService.cartProducts = cartProducts
        this.cartProductService.getTotalPrice()
      },
      increaseQtyRes: (_id:string):void => {
        this.cartProductService.increaseQty(_id)
        this.isLoading = false
      },
      removeFromCartRes: (_id:string):void => {
        this.cartProductService.removeFromCart(_id)
        this.isLoading = false
      }
    }
  }

  ngOnInit():void {
    const {_responses, _socketService, _userService} = this
    const {token} = _userService

    _socketService.listen(_responses)
    _socketService.emit('getCart', token)
  }

  ngOnDestroy():void {
    this._socketService.forget(this._responses)
  }

  onDecreaseQty(productId:string):void {
    const {_socketService, _userService} = this
    const {token} = _userService

    this.isLoading = true
    _socketService.emit('decreaseQty', {token, productId})
  }

  onIncreaseQty(productId:string):void {
    const {_socketService, _userService} = this
    const {token} = _userService

    this.isLoading = true
    _socketService.emit('increaseQty', {token, productId})
  }

  onRemoveFromCart(productId:string):void {
    const {_socketService, _userService} = this
    const {token} = _userService

    this.isLoading = true
    _socketService.emit('removeFromCart', {token, productId})
  }

  checkout():void {
    const totalPriceCart = (this.cartProductService.cartProducts.reduce((acc, cur) => {
      return acc + (Math.floor(
        ((cur.price - cur.discount) / 117)
      ) * cur.qty)
    }, 0)).toString()

    const totalPriceItem = (cartProduct) => {
      return (
        Math.floor((cartProduct.price - cartProduct.discount) / 117)
      ).toString()
    }

    this._matDialog.open(CheckoutComponent, {width: '320px', data: {
      purchase_units: [
        {
          description: 'Game Studio',
          amount: {
            currency_code: 'EUR',
            value: totalPriceCart,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: totalPriceCart
              }
            }
          },
          payee: {
            email_adress: 'gamestudionis@gmail.com'
          },
          items: this.cartProductService.cartProducts.map((cartProduct) => ({
            name: cartProduct.name,
            sku: cartProduct._id,
            quantity: cartProduct.qty,
            unit_amount: {
              currency_code: 'EUR',
              value: totalPriceItem(cartProduct)
            }
          }))
        }
      ]
    }})
  }
}

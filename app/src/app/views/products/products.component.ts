import {Component, OnInit, OnDestroy} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {MatDialog} from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar'
import {Subscription} from 'rxjs'

import {AddProductComponent} from './admin/add-product/add-product.component'
import {EditProductComponent} from './admin/edit-product/edit-product.component'
import {RemoveProductComponent} from './admin/remove-product/remove-product.component'
import {SyncProductsComponent} from './admin/sync-products/sync-products.component'

import {DeviceService} from 'src/app/shared/device/device.service'
import {MenuService} from 'src/app/shared/menu/menu.service'
import {ProductService} from 'src/app/shared/product/product.service'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {UserService} from 'src/app/shared/user/user.service'

import {Product} from 'src/app/shared/models/product.model'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  collection:string
  dbCollection:string
  isLoaded:boolean
  private readonly _responses:any
  private _paramsSubscription:Subscription

  constructor(
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _matDialog:MatDialog,
    private readonly _matSnackBar:MatSnackBar,
    readonly deviceService:DeviceService,
    private readonly _menuService:MenuService,
    readonly productService:ProductService,
    private readonly _socketService:SocketService,
    readonly userService:UserService
  ) {
    this.isLoaded = false
    this._responses = {
      addProductRes: (product:Product):void => {
        productService.add(product)
  
        if (userService.isAdmin) {
          const msg = 'Proizvod je uspešno dodat'
          this._matSnackBar.open(msg, 'OK', {duration: 7000})
        }
      },
      addToCartRes: (msg:string):void => {
        this._matSnackBar.open(msg, 'OK', {duration: 7000})
      },
      editProductRes: (editedProduct:Product):void => {
        productService.findAndModify(editedProduct)
  
        if (userService.isAdmin) {
          const msg = 'Proizvod je uspešno izmenjen'
          this._matSnackBar.open(msg, 'OK', {duration: 7000})
        }
      },
      getProductsRes: (products:Product[]):void => {
        productService.products = products
        this.isLoaded = true
      },
      removeProductRes: (deletedProduct:Product):void => {
        productService.findAndRemove(deletedProduct)
  
        if (userService.isAdmin) {
          const msg = 'Proizvod je uspešno uklonjen'
          this._matSnackBar.open(msg, 'OK', {duration: 7000})
        }
      },
      crawlUsponRes: (msg:string):void => {
        this._matSnackBar.open(msg, 'OK', {duration: 7000})
      }
    }
  }

  ngOnInit():void {
    const {
      _responses,
      _activatedRoute,
      _menuService,
      productService,
      _socketService
    } = this

    _socketService.listen(_responses)

    this._paramsSubscription = _activatedRoute.params.subscribe((params) => {
      this.dbCollection = params.dbCollection
      this.isLoaded = false

      if (window.history.state.collection) {
        this.collection = window.history.state.collection
        productService.collection = window.history.state.collection
      } else {
        // Thanks angular, thanks a lot
        // Maybe next time buy me a pack of cigarettes
        // because I like to smoke after I've been FUCKED
        const repeatUntil = () => {
          if (_menuService.collections.length) {
            _menuService.collections.forEach((collection) => {
              const path = collection.split(' ').join('_').toLowerCase()

              if (path === params.dbCollection) {
                this.collection = collection
                productService.collection = collection
              }
            })
          } else {
            setTimeout(repeatUntil, 1000)
          }
        }

        repeatUntil()
      }

      productService.sortIcon = 'fas fa-sort fa-fw'

      this._socketService.emit('getProducts', params.dbCollection)
    })
  }

  ngOnDestroy():void {
    this._socketService.forget(this._responses)
    this._paramsSubscription.unsubscribe()
  }

  addProduct():void {
    const {collection, _matDialog} = this

    _matDialog.open(AddProductComponent, {
      width: '320px',
      data: {collection}
    })
  }

  syncProducts():void {
    const {collection, _matDialog} = this

    _matDialog.open(SyncProductsComponent, {
      width: '320px',
      data: {collection}
    })
  }

  onAddToCart(product:Product):void {
    const {dbCollection, _socketService, userService} = this
    const productId = product._id
    const {token} = userService

    _socketService.emit('addToCart', {token, dbCollection, productId})
  }

  onEditProduct(product:Product):void {
    this._matDialog.open(EditProductComponent, {
      width: '320px',
      data: {product}
    })
  }

  onRemoveProduct(product:Product):void {
    const {_matDialog} = this
    const {_id, collection} = product

    _matDialog.open(RemoveProductComponent, {
      width: '320px',
      data: {collection, _id}
    })
  }
}

import {Component, OnInit, OnDestroy} from '@angular/core'
import {ActivatedRoute, Params} from '@angular/router'
import {MatDialog} from '@angular/material/dialog'
import {ProductInfoVideoComponent} from './product-info-video/product-info-video.component'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {Product} from 'src/app/shared/models/product.model'

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  product:Product
  displayedColumns:Array<string> = ['a', 'b']
  private readonly _responses:object

  constructor(
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _matDialog:MatDialog,
    private readonly _socketService:SocketService
  ) {
    this._responses = {
      getProductRes: (product:Product):void => {
        this.product = product
      }
    }
  }

  ngOnInit():void {
    const {_responses, _activatedRoute, _socketService} = this

    _socketService.listen(_responses)

    _activatedRoute.params.subscribe((params) => {
      const {dbCollection, productId} = params
      _socketService.emit('getProduct', {dbCollection, productId})
    })
  }
  ngOnDestroy():void {
    this._socketService.forget(this._responses)
  }
  videoDialog() {
    this._matDialog.open(ProductInfoVideoComponent)
  }
}

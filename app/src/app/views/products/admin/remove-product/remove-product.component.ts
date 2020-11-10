import {Component, OnInit, OnDestroy, Inject} from '@angular/core'
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {UserService} from 'src/app/shared/user/user.service'

interface DialogData {collection:string, _id:string}

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent implements OnInit, OnDestroy {
  private readonly _responses:any

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly _dialogData:DialogData,

    matDialogRef:MatDialogRef<RemoveProductComponent>,
    private readonly _socketService:SocketService,
    private readonly _userService:UserService,
  ) {
    this._responses = {
      matDialogClose():void {
        matDialogRef.close()
      }
    }
  }

  ngOnInit():void {
    this._socketService.listen(this._responses)
  }

  ngOnDestroy():void {
    this._socketService.forget(this._responses)
  }

  confirm():void {
    const {_dialogData, _socketService, _userService} = this
    const {collection, _id: productId} = _dialogData
    const dbCollection = collection.split(' ').join('_').toLowerCase()
    const {token} = _userService

    _socketService.emit('removeProduct', {token, dbCollection, productId})
  }
}

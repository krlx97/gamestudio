import {Component, OnInit, OnDestroy, Inject} from '@angular/core'
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {UserService} from 'src/app/shared/user/user.service'

interface DialogData {menuId:string}

@Component({
  selector: 'app-remove-menu',
  templateUrl: './remove-menu.component.html',
  styleUrls: ['./remove-menu.component.css']
})
export class RemoveMenuComponent implements OnInit, OnDestroy {
  private readonly _responses:any

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly _dialogData:DialogData,

    private readonly _matDialogRef:MatDialogRef<RemoveMenuComponent>,
    private readonly _socketService:SocketService,
    private readonly _userService:UserService
  ) {
    this._responses = {
      matDialogClose: ():void => {
        this._matDialogRef.close()
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
    const {menuId} = _dialogData
    const {token} = _userService

    _socketService.emit('removeMenu', {token, menuId})
  }
}

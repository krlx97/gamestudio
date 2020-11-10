import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core'
import {MatSidenav} from '@angular/material/sidenav'
import {MatSnackBar} from '@angular/material/snack-bar'
import {DeviceService} from './shared/device/device.service'
import {SocketService} from './shared/socket/socket.service'
import {UserService} from './shared/user/user.service'
import {Responses, getResponses} from './app.responses'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('appSidenav', {static: true})
  private readonly _appSidenav:MatSidenav
  private readonly _responses:Responses

  constructor(
    _matSnackBar:MatSnackBar,
    readonly deviceService:DeviceService,
    private readonly _socketService:SocketService,
    private readonly _userService:UserService
  ) {
    this._responses = getResponses({_matSnackBar, _userService})
  }

  ngOnInit():void {
    const {_responses, deviceService, _socketService, _userService} = this
    const {token} = _userService

    _socketService.listen(_responses)

    if (deviceService.isDesktop) {
      this._appSidenav.open()
    }

    if (token) {
      _socketService.emit('authenticate', token)
    }
  }

  ngOnDestroy():void {
    this._socketService.forget(this._responses)
  }

  get sidenavMode():string {
    return this.deviceService.isMobile ? 'over' : 'side'
  }
}

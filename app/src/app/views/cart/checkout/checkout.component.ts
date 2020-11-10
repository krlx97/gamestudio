import {Component, OnInit, ViewChild, ElementRef, Inject} from '@angular/core'
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {UserService} from 'src/app/shared/user/user.service'

declare const paypal:any

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypalWrapper', {static: true})
  private readonly _paypalWrapper:ElementRef

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly _dialogData:any,

    private readonly _matSnackBar:MatSnackBar,
    private readonly _socketService:SocketService,
    private readonly _userService:UserService
  ) {}

  ngOnInit():void {
    const {_dialogData, _matSnackBar, _socketService, _userService} = this
    const {token} = _userService
    const config:MatSnackBarConfig = {duration: 7000}

    paypal.Buttons({
      createOrder(data, actions) {
        const {purchase_units} = _dialogData
        return actions.order.create({purchase_units})
      },
      async onApprove(data, actions) {
        const order = await actions.order.capture()
        const msg = 'Uspešno ste izvršili kupovinu'

        _matSnackBar.open(msg, 'OK', config)
        _socketService.emit('checkoutApproved', {token, order})
      },
      onError(err) {
        const msg = 'Došlo je do greške... Molimo pokušajte ponovo'
        _matSnackBar.open(msg, 'OK', config)
      }
    }).render(this._paypalWrapper.nativeElement)
  }
}

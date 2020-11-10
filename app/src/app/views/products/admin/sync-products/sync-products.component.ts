import {Component, Inject} from '@angular/core'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-sync-products',
  templateUrl: './sync-products.component.html',
  styleUrls: ['./sync-products.component.css']
})
export class SyncProductsComponent {
  readonly form:FormGroup

  constructor(
    private readonly _formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly _dialogData:any,
    private readonly _socketService:SocketService
  ) {
    this.form = this._formBuilder.group({
      b2b: ['', Validators.required],
      collection: [_dialogData.collection],
      productsUrl: ['', Validators.required]
    })
  }

  get b2b():FormControl {
    return this.form.get('b2b') as FormControl
  }
  get productsUrl():FormControl {
    return this.form.get('productsUrl') as FormControl
  }

  submit():void {
    this._socketService.emit('syncProducts', this.form.value)
  }
}

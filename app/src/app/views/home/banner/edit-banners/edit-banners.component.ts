import {Component, OnInit, OnDestroy, Inject} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms'
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {UserService} from 'src/app/shared/user/user.service'
import {Banner} from 'src/app/shared/models/banner.model'

interface DialogData {banners?:Banner[]}

@Component({
  selector: 'app-edit-banners',
  templateUrl: './edit-banners.component.html',
  styleUrls: ['./edit-banners.component.css']
})
export class EditBannersComponent implements OnInit, OnDestroy {
  readonly form:FormGroup
  private readonly _responses:any

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly _dialogData:DialogData,

    private readonly _formBuilder:FormBuilder,
    private readonly _matDialogRef:MatDialogRef<EditBannersComponent>,
    private readonly _socketService:SocketService,
    private readonly _userService:UserService
  ) {
    const {banners} = _dialogData

    if (_dialogData) {
      this.form = _formBuilder.group({
        banners: _formBuilder.array(banners.map((banner) => {
          return _formBuilder.group({
            src: [banner.src, Validators.required]
          })
        }))
      })
    } else {
      this.form = _formBuilder.group({
        banners: _formBuilder.array([])
      })
    }

    this._responses = {
      matDialogClose():void {
        _matDialogRef.close()
      }
    }
  }

  ngOnInit():void {
    this._socketService.listen(this._responses)
  }

  ngOnDestroy():void {
    this._socketService.forget(this._responses)
  }

  get banners():FormArray {
    return this.form.get('banners') as FormArray
  }
  src(i:number):FormControl {
    return this.banners.controls[i].get('src') as FormControl
  }

  addBanner():void {
    const banner = this._formBuilder.group({
      src: ['', Validators.required]
    })

    this.banners.push(banner)
  }

  removeBanner(i:number):void {
    this.banners.removeAt(i)
  }

  submit():void {
    const {_socketService, _userService} = this
    const {token} = _userService
    const {banners} = this.form.value

    _socketService.emit('editBanners', {token, banners})
  }
}

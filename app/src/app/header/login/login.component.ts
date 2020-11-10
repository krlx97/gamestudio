import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core'
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {UserService} from 'src/app/shared/user/user.service'
import {LoginRes} from 'src/app/shared/models/login.model'
import {getForm} from './login.form'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('passwordInput') private readonly _passwordInput:ElementRef
  readonly form:FormGroup
  private _isPasswordVisible = false
  isLoaded = true
  private readonly _responses:any

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _matDialogRef:MatDialogRef<LoginComponent>,
    private readonly _matSnackBar:MatSnackBar,
    private readonly _socketService:SocketService,
    private readonly _userService:UserService
  ) {
    this.form = getForm(_formBuilder)

    this._responses = {
      loginRes: (loginRes:LoginRes):void => {
        const {_matSnackBar} = this
        const {token, msg} = loginRes

        if (token) {
          const {_matDialogRef, _userService} = this
          const {role} = loginRes

          _userService.token = token
          _userService.isLoggedIn = true

          if (role === 'admin') {
            _userService.isAdmin = true
          }

          _matDialogRef.close()
        } else {
          this.isLoaded = true
        }

        _matSnackBar.open(msg, 'OK', {duration: 7000})
      }
    }
  }

  ngOnInit():void {
    this._socketService.listen(this._responses)
  }
  ngOnDestroy():void {
    this._socketService.forget(this._responses)
  }

  get email():FormControl {
    return this.form.get('email') as FormControl
  }
  get password():FormControl {
    return this.form.get('password') as FormControl
  }

  get passwordIcon():string {
    return this._isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'
  }

  showHidePassword():void {
    this._isPasswordVisible = !this._isPasswordVisible
    const type = this._isPasswordVisible ? 'text' : 'password'
    this._passwordInput.nativeElement.setAttribute('type', type)
  }

  submit():void {
    this.isLoaded = false
    this._socketService.emit('login', this.form.value)
  }
}

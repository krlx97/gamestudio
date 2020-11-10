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
import {RegisterRes} from 'src/app/shared/models/register.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('passwordInput')
  private readonly _passwordInput:ElementRef

  readonly form:FormGroup
  private _isPasswordVisible = false
  isLoaded = true
  private readonly _responses:any

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _matDialogRef:MatDialogRef<RegisterComponent>,
    private readonly _matSnackBar:MatSnackBar,
    private readonly _socketService:SocketService
  ) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32)
      ]]
    })

    this._responses = {
      registerRes: (registerRes:RegisterRes):void => {
        const {_matSnackBar} = this
        const {success, msg} = registerRes

        if (success) {
          const {_matDialogRef} = this
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
    this._socketService.emit('register', this.form.value)
  }
}

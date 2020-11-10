import {FormGroup, Validators} from '@angular/forms'

export const getForm = (_formBuilder):FormGroup => this._formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(32)
  ]],
  stayLoggedIn: false
})
import {Component, OnInit, OnDestroy} from '@angular/core'
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {UserService} from 'src/app/shared/user/user.service'

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit, OnDestroy {
  readonly form:FormGroup
  private readonly _responses:any

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _matDialogRef:MatDialogRef<AddMenuComponent>,
    private readonly _socketService:SocketService,
    private readonly _userService:UserService
  ) {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      fontAwesome: ['', Validators.required],
      categories: this._formBuilder.array([])
    })

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

  get name():FormControl {
    return this.form.get('name') as FormControl
  }

  get color():FormControl {
    return this.form.get('color') as FormControl
  }

  get fontAwesome():FormControl {
    return this.form.get('fontAwesome') as FormControl
  }

  get categories():FormArray {
    return this.form.get('categories') as FormArray
  }

  collections(i:number):FormArray {
    return this.categories.controls[i].get('collections') as FormArray
  }

  addCategory():void {
    const category = this._formBuilder.group({
      name: ['', Validators.required],
      collections: this._formBuilder.array([])
    })

    this.categories.push(category)
  }

  removeCategory(i:number):void {
    this.categories.removeAt(i)
  }

  addCollection(i:number):void {
    const collection = this._formBuilder.group({
      name: ['', Validators.required]
    })

    this.collections(i).push(collection)
  }

  removeCollection(i:number, k:number):void {
    this.collections(i).removeAt(k)
  }

  submit():void {
    const {_socketService, _userService} = this
    const {token} = _userService
    const menu = this.form.value

    _socketService.emit('addMenu', {token, menu})
  }
}

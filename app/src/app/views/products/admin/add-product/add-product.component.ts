import {Component, OnInit, OnDestroy, Inject} from '@angular/core'
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {UserService} from 'src/app/shared/user/user.service'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {
  readonly form:FormGroup
  private readonly _responses:any

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly _dialogData:{collection:string},

    private readonly _formBuilder:FormBuilder,
    matDialogRef:MatDialogRef<AddProductComponent>,
    private readonly _socketService:SocketService,
    private readonly _userService:UserService
  ) {
    this.form = _formBuilder.group({
      name: ['', Validators.required],
      collection: _dialogData.collection,
      price: [1, [Validators.required, Validators.min(1)]],
      discount: [0, [Validators.required, Validators.min(0)]],
      isInStock: true,
      info: _formBuilder.group({
        short: ['', Validators.maxLength(150)],
        long: ['', Validators.maxLength(600)]
      }),
      tableFields: _formBuilder.array([]),
      media: _formBuilder.group({
        heroImage: ['', Validators.required],
        youtubeUrl: '',
        galleryImages: _formBuilder.array([])
      })
    })

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

  get name():FormControl {
    return this.form.get('name') as FormControl
  }
  get price():FormControl {
    return this.form.get('price') as FormControl
  }
  get discount():FormControl {
    return this.form.get('discount') as FormControl
  }
  get isInStock():FormControl {
    return this.form.get('isInStock') as FormControl
  }
  get short():FormControl {
    return this.form.get('info.short') as FormControl
  }
  get long():FormControl {
    return this.form.get('info.long') as FormControl
  }
  get heroImage():FormControl {
    return this.form.get('media.heroImage') as FormControl
  }
  get youtubeUrl():FormControl {
    return this.form.get('media.youtubeUrl') as FormControl
  }
  get tableFields():FormArray {
    return this.form.get('tableFields') as FormArray
  }
  left(i:number):FormControl {
    return this.tableFields.controls[i].get('left') as FormControl
  }
  right(i:number):FormControl {
    return this.tableFields.controls[i].get('right') as FormControl
  }
  get galleryImages():FormArray {
    return this.form.get('media.galleryImages') as FormArray
  }
  src(i:number):FormControl {
    return this.galleryImages.controls[i].get('src') as FormControl
  }

  addTableField():void {
    const tableField = this._formBuilder.group({
      left: ['', Validators.required],
      right: ['', Validators.required]
    })

    this.tableFields.push(tableField)
  }

  removeTableField(i:number):void {
    this.tableFields.removeAt(i)
  }

  addGalleryImage():void {
    const image = this._formBuilder.group({
      src: ['', Validators.required]
    })

    this.galleryImages.push(image)
  }

  removeGalleryImage(i:number):void {
    this.galleryImages.removeAt(i)
  }

  submit():void {
    const {_dialogData, _socketService, _userService} = this
    const product = this.form.value
    const dbCollection = _dialogData
      .collection
      .split(' ')
      .join('_')
      .toLowerCase()
    const {token} = _userService

    _socketService.emit('addProduct', {token, dbCollection, product})
  }
}
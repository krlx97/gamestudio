import {Component, OnInit, OnDestroy} from '@angular/core'
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms'
import {Router, RouterLink} from '@angular/router'
import {MatDialogRef} from '@angular/material/dialog'
import {SocketService} from '../../shared/socket/socket.service'
import { Product } from 'src/app/shared/models/product.model'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  readonly form:FormGroup
  private readonly _responses:any
  products:Product[] = []
  isLoaded:boolean

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _router:Router,
    readonly matDialogRef:MatDialogRef<SearchComponent>,
    private readonly _socketService:SocketService
  ) {
    this.form = this._formBuilder.group({
      searchTerm: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32)
      ]]
    })

    this._responses = {
      searchRes: (products:Product[]):void => {
        this.products = products
        this.isLoaded = true
      }
    }
  }

  ngOnInit():void {
    this._socketService.listen(this._responses)
  }

  ngOnDestroy():void {
    this._socketService.forget(this._responses)
  }

  get searchTerm():FormControl {
    return this.form.get('searchTerm') as FormControl
  }

  getProductLink(product:Product):string[] {
    const collection = product.collection.split(' ').join('_').toLowerCase()
    return ['/products', collection, product._id]
  }

  submit():void {
    this.isLoaded = false
    this._socketService.emit('search', this.searchTerm.value)
  }
}

import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'

import {MaterialModule} from '../material/material.module'

import {HomeComponent} from './home/home.component'
import {BannerComponent} from './home/banner/banner.component'
import {EditBannersComponent} from './home/banner/edit-banners/edit-banners.component'

import {ProductInfoComponent} from './product-info/product-info.component'
import {ProductInfoVideoComponent} from './product-info/product-info-video/product-info-video.component'
import {ProductsComponent} from './products/products.component'
import {ProductComponent} from './products/product/product.component'
import {RemoveProductComponent} from './products/admin/remove-product/remove-product.component'

import {WildcardComponent} from './wildcard/wildcard.component'

import {CartComponent} from './cart/cart.component'
import {CartProductComponent} from './cart/cart-product/cart-product.component'
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { SyncProductsComponent } from './products/admin/sync-products/sync-products.component'
import {EditProductComponent} from './products/admin/edit-product/edit-product.component'
import {AddProductComponent} from './products/admin/add-product/add-product.component'

@NgModule({
  declarations: [
    CartComponent,
    CartProductComponent,
    HomeComponent,
    BannerComponent,
    EditBannersComponent,
    ProductInfoComponent,
    ProductInfoVideoComponent,
    ProductsComponent,
    ProductComponent,
    RemoveProductComponent,
    WildcardComponent,
    CheckoutComponent,
    SyncProductsComponent,
    EditProductComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    CartComponent,
    HomeComponent,
    ProductInfoComponent,
    ProductsComponent,
    WildcardComponent
  ]
})
export class ViewsModule {}

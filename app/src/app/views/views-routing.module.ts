import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {CartComponent} from './cart/cart.component'
import {HomeComponent} from './home/home.component'
import {ProductInfoComponent} from './product-info/product-info.component'
import {ProductsComponent} from './products/products.component'
import {WildcardComponent} from './wildcard/wildcard.component'

const routes:Routes = [
  {
    path: 'cart',
    component: CartComponent
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'products/:dbCollection',
    children: [
      {
        path: ':productId',
        component: ProductInfoComponent
      }, {
        path: '',
        component: ProductsComponent,
        pathMatch: 'full'
      }
    ]
  }, {
    path: '**',
    component: WildcardComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule {}

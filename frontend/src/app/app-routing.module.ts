import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { CartComponent } from './components/pages/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recherche/:rechercheTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'panier', component: CartComponent }
  // { path: 'service/:id', component: ServicePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { ProductsPageComponent } from './components/pages/products-page/products-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'produits', component: ProductsPageComponent },
  { path: 'recherche/:rechercheTerm', component: ProductsPageComponent },
  { path: 'tag/:tag', component: ProductsPageComponent },
  { path: 'produits/:id', component: ProductPageComponent },
  { path: 'panier', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  // { path: 'service/:id', component: ServicePageComponent }
  // { path: 'services/', component: ServicesPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './guards/auth.guard'; 
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 

  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, 
  
  { path: 'product', component: ProductComponent },
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  
  { path: 'product/:id', component: DetailProductComponent },
  { path: '', redirectTo: '/product/:id', pathMatch: 'full' },

  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: '/cart', pathMatch: 'full' }, 

  { path: 'mycart', component: MyCartComponent },
  { path: '', redirectTo: '/mycart', pathMatch: 'full' }, 

  { path: 'user', component: UserComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' }, 

  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/profile', pathMatch: 'full' }, 

  { path: 'detail-user/:id', component: DetailUserComponent },
  { path: '', redirectTo: '/detailUser', pathMatch: 'full' }, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

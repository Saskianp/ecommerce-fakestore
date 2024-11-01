import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailUserComponent } from './components/detail-user/detail-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    CartComponent,
    DashboardComponent,
    UserComponent,
    NavbarComponent,
    DetailProductComponent,
    ProfileComponent,
    MyCartComponent,
    DetailUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

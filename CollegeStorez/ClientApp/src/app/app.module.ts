import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { StoreComponent } from './store/store.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreEditComponent } from './store-edit/store-edit.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderListComponent } from './order-list/order-list.component';
import { TrendListComponent } from './trend-list/trend-list.component';
import { TrendEditComponent } from './trend-edit/trend-edit.compontent';
import { StoreSearchComponent } from './store-search/store-search.component';

import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthResponseInterceptor } from './services/auth.response.interceptor';
import { RegisterComponent } from './user/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    StoreListComponent,
    StoreComponent,
    StoreEditComponent,
    AboutComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProductListComponent,
    ProductEditComponent,
    OrderEditComponent,
    OrderListComponent,
    TrendListComponent,
    TrendEditComponent,
    StoreSearchComponent,
    RegisterComponent
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'store/create', component: StoreEditComponent },
      //you need to know the store before you edite it
      { path: 'store/edit/:id', component: StoreEditComponent },
      { path: 'store/:id', component: StoreComponent },
      //you need to know the store before you add a product hence the id
      { path: 'product/create/:id', component: ProductEditComponent },
      //you need to know the store before you edit a product hence the id
      { path: 'product/edit/:id', component: ProductEditComponent },
      { path: 'order/create/:id', component: OrderEditComponent },
      { path: 'order/edit/:id', component: OrderEditComponent },
      { path: 'trend/create/:id', component: TrendEditComponent },
      { path: 'trend/edit/:id', component: TrendEditComponent },
      { path: 'about', component: AboutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: "**", component: PageNotFoundComponent }
    ])
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

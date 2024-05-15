import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home_f/home/home.component';

import { NotFoundComponent } from '../components/general_F/not-found/not-found.component';
import { ShopComponent } from '../components/products_f/shop/shop.component';
import { CheckoutComponent } from '../components/cart_f/checkout/checkout.component';
import { ContactUsComponent } from '../components/general_F/contact-us/contact-us.component';
import { CartComponent } from '../components/cart_f/cart/cart.component';
import { LoginComponent } from '../components/general_F/login/login.component';
import { RegisterComponent } from '../components/general_F/register/register.component';
import { AdminProfileComponent } from '../components/Admin_f/admin-profile/admin-profile.component';
import { AdminDashboardComponent } from '../components/Admin_f/admin-dashboard/admin-dashboard.component';
import { AdminCategoriesComponent } from '../components/Admin_f/admin-categories/admin-categories.component';
import { AdminProuductsComponent } from '../components/Admin_f/admin-prouducts/admin-prouducts.component';
import { AdminOrdersComponent } from '../components/Admin_f/admin-orders/admin-orders.component';
import { AdminPromocodesComponent } from '../components/Admin_f/admin-promocodes/admin-promocodes.component';
import { AdminAuthGuard } from '../Sevices/AdminAuthGuard';
import { ProductDetailsComponent } from '../components/Details_f/product-details/product-details.component';



export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Login',component:LoginComponent},
  {path:'Shop',component:ShopComponent},
  {path:'Details/:id',component:ProductDetailsComponent},
  {path:'ContactUs',component:ContactUsComponent},
  {path:'Cart',component:CartComponent},
  {path:'Checkout',component:CheckoutComponent},
  {path:'Admin',component:AdminProfileComponent,canActivate:[AdminAuthGuard]},
  {path:'Admin/Dashboard',component:AdminDashboardComponent,canActivate:[AdminAuthGuard]},
  {path:'Admin/Categories',component:AdminCategoriesComponent,canActivate:[AdminAuthGuard]},
  {path:'Admin/Products',component:AdminProuductsComponent,canActivate:[AdminAuthGuard]},
  {path:'Admin/Orders',component:AdminOrdersComponent,canActivate:[AdminAuthGuard]},
  {path:'Admin/Promocodes',component:AdminPromocodesComponent,canActivate:[AdminAuthGuard]},
  { path: '**', component: NotFoundComponent },
];

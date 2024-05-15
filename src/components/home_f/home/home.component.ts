import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { SliderComponent } from '../slider/slider.component';
import { VendorComponent } from '../vendor/vendor.component';
import { OfferComponent } from '../offer/offer.component';
import { FeaturedComponent } from '../featured/featured.component';
import { ProductsComponent } from '../../products_f/products/products.component';
import { SubscribeComponent } from '../subscribe/subscribe.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SubscribeComponent,VendorComponent,ProductsComponent,CategoryComponent,SliderComponent,VendorComponent,OfferComponent,FeaturedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

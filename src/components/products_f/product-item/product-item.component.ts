import { TopBarComponent } from './../../general_F/top-bar/top-bar.component';
import { CartItemService } from './../../../Sevices/CartItemService';
import { Component,Input } from '@angular/core';
import { ICartItemDTO, IProductDTO } from '../../../Interfaces/Interfaces';
import { CurrencyPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { API_BASE_URL_Image } from '../../../Sevices/BaseUrl';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,RouterLinkActive],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  imgUrl = API_BASE_URL_Image;
constructor(private cartItemService:CartItemService,private TopBarComponent:TopBarComponent){}

  @Input() product_item: IProductDTO = {} as IProductDTO;


  AddToCart(id:number){
let cartitem:ICartItemDTO={product_id:id, quantity:1}
console.log(cartitem );
this.cartItemService.PostCartItem(cartitem).subscribe({
  next:(data)=>{console.log(data); },
  error:(error)=>{console.log(error);}
})

this.TopBarComponent.updateNumberOfCartItems();
  }







}

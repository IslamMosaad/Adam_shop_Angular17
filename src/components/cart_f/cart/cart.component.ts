import { TopBarComponent } from './../../general_F/top-bar/top-bar.component';
import { Subscription } from 'rxjs';
import { ICartItemDTO } from '../../../Interfaces/Interfaces';
import { CartItemService } from './../../../Sevices/CartItemService';
import { Component } from '@angular/core';
import { API_BASE_URL_Image } from '../../../Sevices/BaseUrl';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router ,NavigationEnd} from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(private cartItemService: CartItemService,private router: Router,private TopBarComponent:TopBarComponent){}
  imgUrl = API_BASE_URL_Image;

  cartItems:ICartItemDTO[] = [];
  distroy1: Subscription | undefined;

  Shipping:number = 10;
  Subtotal:number = 0;
TotalCost:number = 0;
  ngOnInit(): void {
    this.cartItemService.GetCartItems().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartItems = (res as ICartItemDTO[]);
        this.updateSubtotal();
        this.TopBarComponent.updateNumberOfCartItems();

      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  updateSubtotal():void{
    this.Subtotal = 0;
    this.TotalCost = 0;
    for(let item of this.cartItems){
      this.Subtotal += item.quantity * item.product_price!;
      }
      this.TotalCost=this.Subtotal+this.Shipping;
}

  RemoveFromCart(product_id:number,cartItemRef:HTMLTableRowElement):void{

    this.distroy1= this.cartItemService.DeleteCartItem(product_id).subscribe({
      next:(res)=>{
        console.log(res);
        cartItemRef.remove();
        this.TopBarComponent.updateNumberOfCartItems();
      },

      error:(error)=>{
        console.log(error);
      }
  })};


  updateCart():void{
    this.distroy1= this.cartItemService.PutCartItem(this.cartItems).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }



  ngOnDestroy(): void {
    this.distroy1?.unsubscribe();
  }


  increaseQuantity(productId:number){
    this.cartItems.find(item => item.product_id === productId)!.quantity++;
    this.updateSubtotal();
  }

  decreaseQuantity(productId:number){
    this.cartItems.find(item => item.product_id === productId)!.quantity--;
    this.updateSubtotal();
  }

  goToCheckout():void{
    this.router.navigate(['/Checkout']);
  }


}

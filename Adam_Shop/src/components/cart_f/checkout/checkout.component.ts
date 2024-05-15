import { Subscription } from 'rxjs';
import { ICartItemDTO } from '../../../Interfaces/Interfaces';
import { CartItemService } from './../../../Sevices/CartItemService';
import { Component } from '@angular/core';
import { API_BASE_URL_Image } from '../../../Sevices/BaseUrl';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router ,NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  constructor(private cartItemService: CartItemService,private router: Router){}
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






  ngOnDestroy(): void {
    this.distroy1?.unsubscribe();
  }




  goToCheckout():void{
    this.router.navigate(['/Checkout']);
  }


}

import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../../Sevices/ProductsService';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICartItemDTO, IProductDTO } from '../../../Interfaces/Interfaces';
import { Subscription } from 'rxjs';
import { API_BASE_URL_Image } from '../../../Sevices/BaseUrl';
import { CurrencyPipe } from '@angular/common';
import { CartItemService } from '../../../Sevices/CartItemService';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnDestroy, OnInit {
  productId: number = 0;
  Product: IProductDTO = {} as IProductDTO;
  imgUrl = API_BASE_URL_Image;
  destroy1: Subscription | undefined;
  destroy2: Subscription | undefined;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartItemService: CartItemService
  ) {}

  ngOnInit(): void {
    this.destroy1 = this.activatedRoute.params.subscribe({
      next: (paramsObject) => {
        this.productId = paramsObject['id'];
      },
    });

    if (this.productId != 0) {
      this.destroy2 = this.productsService
        .GetProduct(this.productId)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.Product = data as IProductDTO;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy1?.unsubscribe();
    this.destroy2?.unsubscribe();
    // this.destroy3?.unsubscribe();
    // this.destroy4?.unsubscribe();
  }





  AddToCart(QuantityRef:HTMLInputElement){
let quantityInput = Number(QuantityRef.value);
    let cartitem:ICartItemDTO={product_id:this.productId, quantity:quantityInput  }
    console.log(cartitem );
    this.cartItemService.PostCartItem(cartitem).subscribe({
      next:(data)=>{console.log(data); },
      error:(error)=>{console.log(error);}
    })


      }



}

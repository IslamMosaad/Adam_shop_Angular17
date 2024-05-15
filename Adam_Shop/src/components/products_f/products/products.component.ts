import { ProductsService } from './../../../Sevices/ProductsService';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { IProductDTO } from '../../../Interfaces/Interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit ,OnDestroy{
constructor(private productsService: ProductsService){}

products:IProductDTO[] = [];
distroy1: Subscription | undefined;



ngOnInit(): void {
  this.productsService.GetProducts(1,8).subscribe({
    next:(res)=>{
      console.log(res);
      this.products = (res as IProductDTO[]);//.slice(0, 8);

    },
    error:(error)=>{
      console.log(error);
    }
  })
}



ngOnDestroy(): void {
  this.distroy1?.unsubscribe();
}








}

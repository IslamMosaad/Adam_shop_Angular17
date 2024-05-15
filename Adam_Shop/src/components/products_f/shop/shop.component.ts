import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductsService } from './../../../Sevices/ProductsService';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { IProductDTO } from '../../../Interfaces/Interfaces';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterOutlet,ProductItemComponent,RouterLinkActive,CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit ,OnDestroy{
  constructor(private productsService: ProductsService){}


  products:IProductDTO[] = [];
pageNumber:number = 1;
pageSize:number = 9;

distroy1: Subscription | undefined;

  ngOnInit(): void {
    this.distroy1=this.productsService.GetProducts(this.pageNumber,this.pageSize).subscribe({
      next:(res)=>{
        console.log(res);
        this.products = (res as IProductDTO[]);//.slice(0, 9);

      },
      error:(error)=>{
        console.log(error);
      }
    })
  }



  ngOnDestroy(): void {
    this.distroy1?.unsubscribe();
  }


  goToNext(){
    this.pageNumber++;
 this.distroy1=this.productsService.GetProducts(this.pageNumber,this.pageSize).subscribe({
      next:(res)=>{
        console.log(res);
        this.products = (res as IProductDTO[]);//.slice(0, 9);

      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  goToPrevious(){
    this.pageNumber=(this.pageNumber-1)>0?(this.pageNumber-1):1;
    this.distroy1=this.productsService.GetProducts(this.pageNumber,this.pageSize).subscribe({
      next:(res)=>{
        console.log(res);
        this.products = (res as IProductDTO[]);//.slice(0, 9);

      },
      error:(error)=>{
        console.log(error);
      }
    })
  }


  goToPage(pageNumber:number):void{
    this.pageNumber=pageNumber;
    this.distroy1=this.productsService.GetProducts(this.pageNumber,this.pageSize).subscribe({
      next:(res)=>{
        console.log(res);
        this.products = (res as IProductDTO[]);//.slice(0, 9);

      },
      error:(error)=>{
        console.log(error);
      }
    })

  }

}

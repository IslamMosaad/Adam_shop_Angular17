import { ImageService } from './../../../Sevices/ImageService';
import { ProductsService } from './../../../Sevices/ProductsService';
import { CategoryService } from './../../../Sevices/CategoryService';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { IProductDTO,ICategoryDTO } from '../../../Interfaces/Interfaces';

@Component({
  selector: 'app-admin-prouducts',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-prouducts.component.html',
  styleUrl: './admin-prouducts.component.scss'
})
export class AdminProuductsComponent {
  constructor(
    private ProductsService: ProductsService,
    private CategoryService: CategoryService,
    private ImageService: ImageService,
      ) { }


      categories:ICategoryDTO[] = [];
      products:IProductDTO[] = [];
      modifiedProduct:IProductDTO|undefined;
      editProductId:number=0;

      ngOnInit(): void {
        this.updateProductsInPage();
        this.updateCateoriesInPage();
      }


      // id: number;
      // title: string;
      AddProductForm= new FormGroup({
        product_title: new FormControl<string | null>(null, [ Validators.required, Validators.minLength(3) ]),
        product_description: new FormControl<string | null>(null, [ Validators.required, Validators.minLength(3) ]),
        product_image: new FormControl<string | null>(null, [ Validators.required, Validators.minLength(3) ]),
        product_price: new FormControl<number | null>(null, [ Validators.required ]),
        product_stock: new FormControl<number | null>(null, [ Validators.required ]),
        product_categoryId: new FormControl<number | null>(null, [ Validators.required ])

      })


      get getProductName(){return this.AddProductForm.controls['product_title'];}
      get getproduct_description(){return this.AddProductForm.controls['product_description'];}
      get getproduct_image(){return this.AddProductForm.controls['product_image'];}
      get getproduct_price(){return this.AddProductForm.controls['product_price'];}
      get getproduct_stock(){return this.AddProductForm.controls['product_stock'];}
      get getproduct_categoryId(){return this.AddProductForm.controls['product_categoryId'];}







      destroy1: Subscription | undefined;
      destroy2: Subscription | undefined;
      ngOnDestroy(): void {
        this.destroy1?.unsubscribe();
        this.destroy2?.unsubscribe();
      }


      onSubmit() {
//add new prodcut
        if(this.editProductId==0){
        if (this.AddProductForm.status == 'VALID') {
          let formObj:IProductDTO={
            id:this.editProductId,
           title:this.AddProductForm.value.product_title||"",
           description:this.AddProductForm.value.product_description||"",
           img:this.AddProductForm.value.product_image||"",
           price:this.AddProductForm.value.product_price||0,
           stock:this.AddProductForm.value.product_stock||0,
           categoryId:this.AddProductForm.value.product_categoryId||0
          }
          console.log("formObj",formObj);
          this.destroy1 = this.ProductsService.PostProduct(formObj )
          .subscribe({
            next: (res) => {
             let response = res as IProductDTO;
              console.log("response",response);
              this.AddProductForm.reset();
              this.updateProductsInPage();
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
      }

//update this prodcut
      else{
        let formObj:IProductDTO={
          id:this.editProductId,
         title:this.AddProductForm.value.product_title||"",
         description:this.AddProductForm.value.product_description||"",
         img:this.AddProductForm.value.product_image||"",
         price:this.AddProductForm.value.product_price||0,
         stock:this.AddProductForm.value.product_stock||0,
         categoryId:this.AddProductForm.value.product_categoryId||0
        }
        console.log("formObj",formObj);

    this.destroy1 = this.ProductsService.PutProduct(this.editProductId,formObj)
    .subscribe({
      next: (res) => {
       let response = res as IProductDTO;
        console.log("response",response);
        this.AddProductForm.reset();
          this.editProductId=0;
          this.updateProductsInPage();
      },
      error: (error) => {
        console.log(error);
      },
    })

      }

      }


      editProduct(element_idRef:HTMLTableCellElement):void
      {
    this.editProductId=parseInt(element_idRef.innerText);
     this.modifiedProduct=this.products.find(x=>x.id==this.editProductId)!;
     this.getProductName.setValue(this.modifiedProduct.title||"");
     this.getproduct_description.setValue(this.modifiedProduct.description||"");
     this.getproduct_image.setValue(this.modifiedProduct.img||"");
     this.getproduct_price.setValue(this.modifiedProduct.price||0);
     this.getproduct_stock.setValue(this.modifiedProduct.stock||0);
     this.getproduct_categoryId.setValue(this.modifiedProduct.categoryId||0);
      }

      deleteProduct(element:HTMLTableCellElement):void{
        this.editProductId=parseInt(element.innerText);
        this.destroy1 = this.ProductsService.DeleteProduct(this.editProductId)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.AddProductForm.reset();
              this.editProductId=0;
              this.updateProductsInPage();
          },
          error: (error) => {
            console.log(error);
          },
        })



      }



      onSelectFile(event: Event) {
        interface imageResponse { imageRelativePath: string; }
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files.length > 0) {

          const file = inputElement.files[0];
          const formData = new FormData();
          formData.append('file', file);

          this.ImageService.uploadImage(formData).subscribe((res: any) => {
            res as imageResponse;
            console.log(res.imageRelativePath);
            this.getproduct_image.setValue(res.imageRelativePath);

          });
        }
      }






      updateProductsInPage(){

      this.destroy2=this.ProductsService.GetProducts().subscribe({
        next:(res)=>{
          this.products = res as IProductDTO[];
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }



    updateCateoriesInPage(){

      this.destroy2=this.CategoryService.GetCategories().subscribe({
        next:(res)=>{
          this.categories = res as ICategoryDTO[];
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }







}

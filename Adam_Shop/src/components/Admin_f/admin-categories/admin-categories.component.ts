import { CategoryService } from './../../../Sevices/CategoryService';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import {  ICategoryDTO } from '../../../Interfaces/Interfaces';
@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.scss'
})
export class AdminCategoriesComponent implements OnInit {
  constructor(
private CategoryService: CategoryService,
  ) { }

categories:ICategoryDTO[] = [];
editCategoryId:number=0;


  ngOnInit(): void {
    this.updateCateoriesInPage();
  }


  // id: number;
  // title: string;
  AddCategoryForm= new FormGroup({
    CategoryName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(3),
    ])
  })


  get getCategoryName(){
    return this.AddCategoryForm.controls['CategoryName'];
  }

  destroy1: Subscription | undefined;
  destroy2: Subscription | undefined;
  ngOnDestroy(): void {
    this.destroy1?.unsubscribe();
    this.destroy2?.unsubscribe();
  }


  onSubmit() {

    if(this.editCategoryId==0){
    if (this.AddCategoryForm.status == 'VALID') {
      let formObj:ICategoryDTO={
        id:this.editCategoryId,
       title:this.AddCategoryForm.value.CategoryName||""
      // title:this.getCategoryName.value||""
      }
      this.destroy1 = this.CategoryService.PostCategory(formObj )
      .subscribe({
        next: (res) => {
         let response = res as ICategoryDTO;
          this.AddCategoryForm.reset();
          this.updateCateoriesInPage();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }


  else{
    let formObj:ICategoryDTO={
      id:this.editCategoryId,
     title:this.AddCategoryForm.value.CategoryName||""
    // title:this.getCategoryName.value||""
    }
this.destroy1 = this.CategoryService.PutCategory(this.editCategoryId,formObj)
.subscribe({
  next: (res) => {
   let response = res as ICategoryDTO;
    console.log(response);
    this.AddCategoryForm.reset();
      this.editCategoryId=0;
      this.updateCateoriesInPage();
  },
  error: (error) => {
    console.log(error);
  },
})

  }




  }







  editCategory(element_idRef:HTMLTableCellElement,element_titleRef:HTMLTableCellElement):void
  {
this.editCategoryId=parseInt(element_idRef.innerText);
this.getCategoryName.setValue(element_titleRef.innerText);
  }

  deleteCategory(element:HTMLTableCellElement):void{
    this.editCategoryId=parseInt(element.innerText);
    this.destroy1 = this.CategoryService.DeleteCategory(this.editCategoryId)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.AddCategoryForm.reset();
          this.editCategoryId=0;
          this.updateCateoriesInPage();
      },
      error: (error) => {
        console.log(error);
      },
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

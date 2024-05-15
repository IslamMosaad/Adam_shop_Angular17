import { AccountService } from './../../../Sevices/AccountService';
import { ImageService } from './../../../Sevices/ImageService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { FormControl,FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { ILoginResponse } from '../../../Interfaces/Interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy, OnInit {
  constructor(
    public ImageService: ImageService,
    public AccountService: AccountService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }



LoginForm= new FormGroup({
  email: new FormControl<string | null>(null, [
    Validators.required,
    Validators.email,
  ]),
  password: new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(5),
  ])
})


get getEmail() {
  return this.LoginForm.controls['email'];
}


get getPassword() {
  return this.LoginForm.controls['password'];
}


destroy1: Subscription | undefined;
destroy2: Subscription | undefined;

ngOnDestroy(): void {
  this.destroy1?.unsubscribe();
  this.destroy2?.unsubscribe();
}

ngOnInit(): void {}

onSubmit() {
  console.log(this.LoginForm);
  if (this.LoginForm.status == 'VALID') {
    this.destroy2 = this.AccountService.Login_Account(this.LoginForm.value as FormData)
    .subscribe({
      next: (res) => {
       let response = res as ILoginResponse;
        localStorage.setItem('token', response.message);
        localStorage.setItem('isAdmin', response.isAdmin.toString());
        console.log(response);
        if(response.isAdmin){this.router.navigate(['/Admin']);}
        else{this.router.navigate(['/Shop']);}
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}












}

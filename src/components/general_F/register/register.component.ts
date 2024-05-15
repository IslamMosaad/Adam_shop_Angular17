import { AccountService } from './../../../Sevices/AccountService';
import { ImageService } from './../../../Sevices/ImageService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { FormControl,FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { IRegisterDTO } from '../../../Interfaces/Interfaces';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy, OnInit {
  constructor(
    public ImageService: ImageService,
    public AccountService: AccountService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  //#region FormGroup
  RegisterForm = new FormGroup({
    firstName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    profileImage: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    confirmPassword: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    phoneNumber: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(/^\d{11}$/),
    ]),
    gender: new FormControl<string | null>(null, [Validators.required]),
    address: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3),]),
  });


  //#endregion

  //#region  get Properties of FormGroup

  get getFirstName() {
    return this.RegisterForm.controls['firstName'];
  }
  get getLastName() {
    return this.RegisterForm.controls['lastName'];
  }
  get getEmail() {
    return this.RegisterForm.controls['email'];
  }
  get getProfileImage() {
    return this.RegisterForm.controls['profileImage'];
  }

  get getPassword() {
    return this.RegisterForm.controls['password'];
  }

  get getConfirmPassword() {
    return this.RegisterForm.controls['confirmPassword'];
  }

  get getPhoneNumber() {
    return this.RegisterForm.controls['phoneNumber'];
  }

  get getGender() {
    return this.RegisterForm.controls['gender'];
  }

  get getAddress() {
    return this.RegisterForm.controls['address'];
  }

  //#endregion

  destroy1: Subscription | undefined;
  destroy2: Subscription | undefined;

  ngOnInit(): void {
    // this.destroy1 = this.RegisterForm.valueChanges.subscribe((res) => {


    //   this.getFirstName.setValue(null);
    //   this.getFirstName.setValue(null);
    //   this.getLastName.setValue(null);
    //   this.getEmail.setValue(null);
    //   this.getPassword.setValue(null);
    //   this.getConfirmPassword.setValue(null);
    //   this.getPhoneNumber.setValue(null);
    //   this.getGender.setValue(null);
    //   this.getAddress.setValue(null);
    // });
  }

  ngOnDestroy(): void {
    this.destroy1?.unsubscribe();
    this.destroy2?.unsubscribe();
  }

  onSubmit() {

    console.log(this.RegisterForm);
    if (this.RegisterForm.status == 'VALID') {
      this.destroy2 = this.AccountService.Insert_Account(
        false,//normal Account
        this.RegisterForm.value as IRegisterDTO
      ).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/Login']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }










  onSelectFile(event: Event) {
    interface imageResponse {
      imageRelativePath: string;
    }

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.ImageService.uploadImage(formData).subscribe((res: any) => {
        res as imageResponse;
        console.log(res.imageRelativePath);
        this.getProfileImage.setValue(res.imageRelativePath);
      });
    }
  }




}

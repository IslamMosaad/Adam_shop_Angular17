import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterDTO } from '../Interfaces/Interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'http://localhost:5284/api/Auth';
  constructor(private http: HttpClient) {}

  Insert_Account(  isAdmin: boolean,registerDTOObject: IRegisterDTO ): Observable<any> {
    return this.http.post(`${this.baseUrl}/Register/${isAdmin}`, registerDTOObject);
  }

  Login_Account( formData: FormData ): Observable<any> {
    return this.http.post(`${this.baseUrl}/Login`, formData);
  }





}

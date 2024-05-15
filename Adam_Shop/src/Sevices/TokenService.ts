import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor(private http: HttpClient) { }

  token: string | undefined =  '';
  //header_object: HttpHeaders = new HttpHeaders();
  updateToken():HttpHeaders|undefined {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token') || '';
      return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    }else{
      console.log('no localStorage');
      return new HttpHeaders();
    }
  }


}


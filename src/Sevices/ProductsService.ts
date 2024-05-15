import { TokenService } from './TokenService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryDTO } from '../Interfaces/Interfaces';
import { API_BASE_URL } from './BaseUrl';
@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  //http://localhost:5284/api/Products?page=0&pageSize=0

  baseUrl: string = API_BASE_URL+'Products';
  token: string | undefined =  '';
  header_object: HttpHeaders|undefined = new HttpHeaders();
  constructor(private http: HttpClient,private TokenService: TokenService) {

  }

  ngOnInit(): void {
    this.header_object=this.TokenService.updateToken();
  }



  GetProducts( page: number = 0, pageSize: number = 0 ): Observable<any> {
    this.header_object=this.TokenService.updateToken();
    return this.http.get(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`,{headers: this.header_object});
  }

  GetProduct( id: number ): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  PostProduct( categoryDTO: ICategoryDTO  ): Observable<any> {
    this.header_object=this.TokenService.updateToken();
    return this.http.post(`${this.baseUrl}`, categoryDTO,{headers: this.header_object});
  }




  PutProduct( id: number ,categoryDTO: ICategoryDTO  ): Observable<any> {
    this.header_object=this.TokenService.updateToken();
    return this.http.put(`${this.baseUrl}/${id}`, categoryDTO,{headers: this.header_object});
  }

  DeleteProduct( id: number ): Observable<any> {
    this.header_object=this.TokenService.updateToken();
    return this.http.delete(`${this.baseUrl}/${id}`,{headers: this.header_object});
  }

}

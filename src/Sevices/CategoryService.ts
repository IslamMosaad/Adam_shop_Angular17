import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryDTO } from '../Interfaces/Interfaces';
import { TokenService } from './TokenService';

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements OnInit {
  baseUrl: string = 'http://localhost:5284/api/Category';

  header_object: HttpHeaders|undefined = new HttpHeaders();
  constructor(private http: HttpClient,private TokenService: TokenService) {


  }

  ngOnInit(): void {
    this.header_object=this.TokenService.updateToken();
  }



  GetCategories(  ): Observable<any> {
    this.header_object=this.TokenService.updateToken();
    return this.http.get(this.baseUrl,{headers: this.header_object});
  }

  GetCategory( id: number ): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  PostCategory( categoryDTO: ICategoryDTO  ): Observable<any> {
    this.header_object=this.TokenService.updateToken();
    return this.http.post(`${this.baseUrl}`, categoryDTO,{headers: this.header_object});
  }


  PutCategory( id: number ,categoryDTO: ICategoryDTO  ): Observable<any> {
    this.header_object=this.TokenService.updateToken();
    return this.http.put(`${this.baseUrl}/${id}`, categoryDTO,{headers: this.header_object});
  }

  DeleteCategory( id: number ): Observable<any> {
    this.header_object=this.TokenService.updateToken();
    return this.http.delete(`${this.baseUrl}/${id}`,{headers: this.header_object});
  }

}

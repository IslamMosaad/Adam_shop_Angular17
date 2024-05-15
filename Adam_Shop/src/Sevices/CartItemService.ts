import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit ,EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './BaseUrl';
import { ICartItemDTO } from '../Interfaces/Interfaces';
import { TokenService } from './TokenService';
import { tap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartItemService implements OnInit {
//http://localhost:5284/api/CartItem
  baseUrl: string = API_BASE_URL + 'CartItem';

  cartItemsUpdated = new EventEmitter<ICartItemDTO[]>();

  header_object: HttpHeaders|undefined = new HttpHeaders();
  constructor(private http: HttpClient,private TokenService: TokenService) {

  }

  ngOnInit(): void {
  }




  GetCartItems(): Observable<any> {
    this.header_object = this.TokenService.updateToken();

    return this.http.get(this.baseUrl, { headers: this.header_object }).pipe(
      map((res: Object) => res as ICartItemDTO[]),
      tap((cartItems: ICartItemDTO[]) => {
        // Emit the event whenever the cart items are updated
        this.cartItemsUpdated.emit(cartItems);
      })
    );
  }




  GetCartItem( product_id:number ): Observable<any> {
    this.header_object=this.TokenService.updateToken();
    return this.http.get(`${this.baseUrl}/${product_id}`,{headers: this.header_object});
  }


  PostCartItem( cartItemDTO: ICartItemDTO  ): Observable<any> {
    this.header_object=this.TokenService.updateToken();
    return this.http.post(`${this.baseUrl}`, cartItemDTO,{headers: this.header_object});
  }




  PutCartItem( cartItemsDTO: ICartItemDTO[]  ): Observable<any> {
    this.header_object=this.TokenService.updateToken();
    return this.http.put(`${this.baseUrl}`, cartItemsDTO,{headers: this.header_object});
  }


  DeleteCartItem( product_id:number ): Observable<any> {
    this.header_object=this.TokenService.updateToken();
    return this.http.delete(`${this.baseUrl}/${product_id}`,{headers: this.header_object});
  }

}

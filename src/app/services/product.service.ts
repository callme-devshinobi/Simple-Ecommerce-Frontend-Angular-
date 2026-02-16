import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dataUrl = 'assets/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
  getProductById(id: number): Observable<any>{
    return this.http.get(this.dataUrl);
  }
}
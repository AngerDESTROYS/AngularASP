import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + '/api/products');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseApiUrl}/api/products/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    product.id = 1
    return this.http.post<Product>(`${this.baseApiUrl}/api/products`, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseApiUrl}/api/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<any>(`${this.baseApiUrl}/api/products/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseApiUrl}/api/Products/category/${category}`);
  }
}

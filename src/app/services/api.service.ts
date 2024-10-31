import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrlAuth = 'https://fakestoreapi.com/auth/login';
  private apiUrlProduct = 'https://fakestoreapi.com/products';
  private apiUrlCategories = 'https://fakestoreapi.com/products/categories';
  private apiUrlCart = 'https://fakestoreapi.com/carts';
  private apiUrlUser = 'https://fakestoreapi.com/users';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAuth}`, { username, password });
  }
  
  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);  
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable(); 
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token'); 
  }

  getAllProducts(limit?: number, sort?: 'asc' | 'desc'): Observable<any[]> {
    let params = new HttpParams();
    if (limit) params = params.append('limit', limit.toString());
    if (sort) params = params.append('sort', sort);

    return this.http.get<any[]>(this.apiUrlProduct, { params });
  }

  getProductsByCategories(category: string, limit?: number, sort?: 'asc' | 'desc'): Observable<any[]> {
    let params = new HttpParams();
    if (limit) params = params.append('limit', limit.toString());
    if (sort) params = params.append('sort', sort);

    return this.http.get<any[]>(`${this.apiUrlProduct}/category/${category}`, { params });
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlProduct}/${id}`);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlCategories);
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlProduct}/category/${category}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrlProduct, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlProduct}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlProduct}/${id}`);
  }
}
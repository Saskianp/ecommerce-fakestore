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

  //Product
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
    return this.http.post<any>(this.apiUrlProduct, {
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image, 
      category: product.category
    });
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrlProduct}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlProduct}/${id}`);
  }

  //Cart
  getAllCart(): Observable<any> {
    return this.http.get<any>(this.apiUrlCart);
  }

  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.http.post<any>(this.apiUrlCart, {
      userId: 1,
      date: new Date(),
      products: [{ productId, quantity }]
    });
  }

  getFilteredCarts(
    limit?: number,
    sort?: 'asc' | 'desc',
    startDate?: string,
    endDate?: string
  ): Observable<any[]> {
    let params = new HttpParams();

    if (limit) params = params.append('limit', limit.toString());
    if (sort) params = params.append('sort', sort);
    if (startDate && endDate) {
      params = params.append('startdate', startDate);
      params = params.append('enddate', endDate);
    }

    return this.http.get<any[]>(this.apiUrlCart, { params });
  }

  getCartById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlCart}/${id}`);
  }

  getCartByUser(idUser: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlCart}/user/${idUser}`);
  }

  updateCartItem(itemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrlCart}/${itemId}`, { quantity });
  }
  
  deleteCartItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlCart}/${itemId}`);
  }  

  //User
  getUsers(limit?: number, sort?: 'asc' | 'desc'): Observable<any[]> {
    let params = new HttpParams();
    if (limit) params = params.append('limit', limit.toString());
    if (sort) params = params.append('sort', sort);
    return this.http.get<any[]>(this.apiUrlUser, { params });
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlUser}/${userId}`);
  }

  addUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlUser, userData);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlUser}/${userId}`, userData);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlUser}/${userId}`);
  }
  
}
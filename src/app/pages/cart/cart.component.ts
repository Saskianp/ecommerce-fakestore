import { Component } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  limit: number = 20;
  sort: 'asc' | 'desc' = 'asc';
  startDate: string = '2019-12-10';
  endDate: string = '2024-11-01';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchCartItems
    this.fetchCartsWithProductDetails();
  }

  fetchCartsWithProductDetails(): void {
    this.loading = true;
    this.apiService.getFilteredCarts(this.limit, this.sort, this.startDate, this.endDate).subscribe({
      next: (carts) => {
        const productRequests = carts.map((cart) => {
          const productObservables = cart.products.map((product: any) =>
            this.apiService.getProductById(product.productId).pipe(
              map((productData) => ({
                ...product,
                details: productData // Add product details here
              }))
            )
          );
          return forkJoin(productObservables).pipe(
            map((productsWithDetails) => ({
              ...cart,
              products: productsWithDetails
            }))
          );
        });

        forkJoin(productRequests).subscribe({
          next: (cartsWithDetails) => {
            this.cartItems = cartsWithDetails;
            this.loading = false;
          },
          error: () => {
            this.errorMessage = 'Failed to load cart items with product details.';
            this.loading = false;
          },
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load cart items.';
        this.loading = false;
      },
    });
  }

  onFilterChange(): void {
    this.fetchCartsWithProductDetails();
  }

  fetchCartItems(): void {
    this.loading = true;
    this.apiService.getAllCart().subscribe({
      next: (data) => {
        this.cartItems = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load cart items.';
        this.loading = false;
      }
    });
  }

  updateCartItemQuantity(itemId: number, quantity: number): void {
    this.apiService.updateCartItem(itemId, quantity).subscribe({
      next: () => {
        this.fetchCartItems();
      },
      error: (err) => {
        this.errorMessage = 'Failed to update cart item.';
      }
    });
  }

  deleteCartItem(itemId: number): void {
    this.apiService.deleteCartItem(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      },
      error: (err) => {
        this.errorMessage = 'Failed to delete cart item.';
      }
    });
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent {
  product: any;
  quantity: number = 1;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchProductDetail(productId);
  }

  fetchProductDetail(id: number): void {
    this.loading = true;
    this.apiService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load product details.';
        this.loading = false;
      }
    });
  }

  addToCart(): void {
    this.apiService.addToCart(this.product.id, this.quantity).subscribe({
      next: () => alert('Product added to cart!'),
      error: () => this.errorMessage = 'Failed to add product to cart.'
    });
  }

  updateProduct(): void {
    this.apiService.updateProduct(this.product.id, this.quantity).subscribe({
      next: () => alert('Product updated.'),
      error: () => this.errorMessage = 'Failed to update product.'
    });
  }

  deleteProduct(): void {
    this.apiService.deleteProduct(this.product.id).subscribe({
      next: () => alert('Product removed!'),
      error: () => this.errorMessage = 'Failed to remove product.'
    });
  }
}
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
[x: string]: any;
  products: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  selectedSort: 'asc' | 'desc' = 'asc';
  limit: number = 10;

  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchProducts();
  }

  fetchCategories(): void {
    this.apiService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load categories.';
      }
    });
  }

  fetchProducts(): void {
    this.loading = true;
    if (this.selectedCategory) {
      this.apiService.getProductsByCategories(this.selectedCategory, this.limit, this.selectedSort).subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load products by category.';
          this.loading = false;
        }
      });
    } else {
      this.apiService.getAllProducts(this.limit, this.selectedSort).subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load products.';
          this.loading = false;
        }
      });
    }
  }

  onFilterChange(): void {
    this.fetchProducts();
  }
}

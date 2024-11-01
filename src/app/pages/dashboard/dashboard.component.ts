import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  products: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  selectedSort: 'asc' | 'desc' = 'asc';
  limit: number = 0;

  isAddProductModalOpen: boolean = false;

  newProduct = {
    title: '',
    price: null,
    description: '',
    image: '',
    category: ''
  };

  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
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

  viewProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }

  openAddProductModal(): void {
    this.isAddProductModalOpen = true;
  }

  closeAddProductModal(): void {
    this.isAddProductModalOpen = false;
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.newProduct.image = `https://fakestoreapi.com/img/${file.name}`;
    }
  }


}

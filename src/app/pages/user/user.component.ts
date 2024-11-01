import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  limit: number = 5;
  sort: 'asc' | 'desc' = 'asc';

  isModalOpen = false;
  isEditMode = false;
  userForm = {
    username: '',
    email: '',
    phone: '',
    name: {
      firstname: '',
      lastname: ''
    },
    address: {
      street: '',
      city: '',
      zipcode: ''
    }
  };

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    this.apiService.getUsers(this.limit, this.sort).subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load users.';
        this.loading = false;
      },
    });
  }

  openAddUserModal(): void {
    this.isEditMode = false;
    this.resetForm();
    this.isModalOpen = true;
  }

  openUpdateUserModal(user: any): void {
    this.isEditMode = true;
    this.userForm = { ...user };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  resetForm(): void {
    this.userForm = {
      username: '',
      email: '',
      phone: '',
      name: {
        firstname: '',
        lastname: ''
      },
      address: {
        street: '',
        city: '',
        zipcode: ''
      }
    };
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateUser(this.userForm);
    } else {
      this.addUser(this.userForm);
    }
    this.closeModal();
  }

  addUser(newUser: any): void {
    this.apiService.addUser(newUser).subscribe({
      next: (user) => {
        this.users.push(user),
        alert('Success to add user!');
      },
      error: () => {
        this.errorMessage = 'Failed to add user.';
      }
    });
  }

  updateUser(updatedUser: any): void {
    this.apiService.updateUser(updatedUser.id, updatedUser).subscribe({
      next: () => {
        this.fetchUsers(),
        alert('Success to update user!');
      },
      error: () => {
        this.errorMessage = 'Failed to update user.';
      }
    });
  }

  deleteUser(userId: number): void {
    this.apiService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== userId),
        alert('Success to delete user!');
      },
      error: () => {
        this.errorMessage = 'Failed to delete user.';
      }
    });
  }

  onFilterChange(): void {
    this.fetchUsers();
  }


  viewUserDetail(userId: number): void {
    this.router.navigate(['/detail-user', userId]);
  }
  
}

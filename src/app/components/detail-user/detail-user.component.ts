import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent {
  userId!: number;
  userDetail: any;

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getUserById(this.userId).subscribe(
      data => this.userDetail = data,
      error => console.error('Error fetching user details:', error)
    );
  }

}

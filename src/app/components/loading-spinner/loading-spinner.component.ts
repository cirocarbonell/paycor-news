import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class LoadingSpinnerComponent implements OnInit {
  public isLoading!: Observable<boolean>;

  constructor(private loadingSpinnerService: LoadingSpinnerService) {}

  ngOnInit() {
    this.isLoading = this.loadingSpinnerService.loading$;
  }
}

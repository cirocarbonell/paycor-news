import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-table-news',
  standalone: true,
  templateUrl: './table-news.component.html',
  styleUrls: ['./table-news.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatSnackBarModule,
    LoadingSpinnerComponent,
  ],
})
export class TableNewsComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['image', 'title', 'word_count'];

  public dataSource: MatTableDataSource<Article> =
    new MatTableDataSource<Article>();

  public countSource: number = 0;

  private destroy$ = new Subject<void>();

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService
      .getArticleList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.dataSource.data = data;
        this.countSource = data.length;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

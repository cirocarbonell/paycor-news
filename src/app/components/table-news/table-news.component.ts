import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.interface';

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
export class TableNewsComponent implements OnInit {
  public displayedColumns: string[] = ['image', 'title', 'word_count'];

  public dataSource: MatTableDataSource<Article> =
    new MatTableDataSource<Article>();

  public countSource: number = 0;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticleList().subscribe((data: any) => {
      this.dataSource.data = data;
      this.countSource = data.length;
    });
  }
}

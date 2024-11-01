import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.interface';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { TableNewsComponent } from 'src/app/components/table-news/table-news.component';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { NetworkStatusService } from 'src/app/services/network-status.service';

@Component({
  selector: 'app-main-news',
  standalone: true,
  templateUrl: './main-news.component.html',
  styleUrls: ['./main-news.component.scss'],
  imports: [ToolbarComponent, TableNewsComponent, LoadingSpinnerComponent],
})
export class MainNewsComponent implements OnInit {
  newsData: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private networkStatusService: NetworkStatusService
  ) {}

  ngOnInit(): void {
    this.onLoadMain();
    this.networkStatusService.statusControlNetworK();
  }

  public onLoadMain(): void {
    this.articleService.loadArticleList();
  }
}

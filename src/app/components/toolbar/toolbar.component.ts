import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotificationsListComponent } from '../notifications-list/notifications-list.component';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    NotificationsListComponent,
  ],
})
export class ToolbarComponent {
  constructor(private articleService: ArticleService) {}

  refreshNews() {
    this.articleService.loadArticleList();
  }
}

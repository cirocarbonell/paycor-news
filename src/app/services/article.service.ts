import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Article } from '../models/article.interface';
import { ArticleStorageService } from './article-storage.service';
import { HttpArticleRequester } from './http-article-requester.service';
import { LoadingSpinnerService } from './loading-spinner.service';
import { SnackbarService } from './snackbar.service';
import { Messages } from '../util/messages';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articleListObservable = new BehaviorSubject<Article[]>([]);

  constructor(
    private articleStorageService: ArticleStorageService,
    private httpArticleRequester: HttpArticleRequester,
    private loadingSpinnerService: LoadingSpinnerService,
    private snackbarService: SnackbarService,
    private notificationService: NotificationService
  ) {}

  public getArticleList(): Observable<Article[]> {
    return this.articleListObservable.asObservable();
  }

  public setArticleList(value: Article[]): void {
    this.articleListObservable.next(value);
  }

  public loadArticleList() {
    this.loadingSpinnerService.startLoading();

    this.httpArticleRequester
      .getArticlesFromTimes()
      .pipe(take(1))
      .subscribe({
        next: (data: Article[]) => {
          this.setArticleList(data);
          this.articleStorageService.addArticleStorage(data);
          this.showSaveNotifications(Messages.NEWS_LOADED_SUCCESS);
          this.loadingSpinnerService.stopLoading();
        },
        error: (error) => {
          const valueArticleStorage =
            this.articleStorageService.getArticleListStorage();
          this.setArticleList(valueArticleStorage);

          if (valueArticleStorage.length != 0) {
            this.showSaveNotifications(Messages.NEWS_API_ERROR_WITH_CACHE);
          } else {
            this.showSaveNotifications(Messages.NEWS_API_ERROR_NO_CACHE);
          }

          this.loadingSpinnerService.stopLoading();
        },
      });
  }

  private showSaveNotifications(messages: string) {
    this.snackbarService.show(messages, Messages.CLOSED);
    this.notificationService.addNotification(messages);
  }
}

import { Injectable } from '@angular/core';
import { ArticleStorageService } from './article-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationArticle } from '../models/notification-article.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationObservable = new BehaviorSubject<NotificationArticle[]>(
    []
  );

  constructor(private articleStorageService: ArticleStorageService) {}

  public getNotificationObservable(): Observable<NotificationArticle[]> {
    return this.notificationObservable.asObservable();
  }

  public setNotificationObservable(value: NotificationArticle[]): void {
    this.notificationObservable.next(value);
  }

  addNotification(textNotif: string) {
    this.articleStorageService.addNotificationStorage({
      text: textNotif,
      viewed: false,
    });
    const data = this.getAllNotificationStorage();
    this.setNotificationObservable(data);
  }

  setAllNotificationAsViews() {
    const data = this.getAllNotificationStorage();
    const updatedDataViews = data.map((notification) => ({
      ...notification,
      viewed: true,
    }));

    this.articleStorageService.setNotificationStorage(updatedDataViews);
    this.setNotificationObservable(updatedDataViews);
  }

  getAllNotificationStorage() {
    return this.articleStorageService.getNotificationListStorage();
  }

  removeAllNotificationStorage() {
    return this.articleStorageService.removeNotificationStorage();
  }
}

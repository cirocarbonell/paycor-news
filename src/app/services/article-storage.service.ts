import { Injectable } from '@angular/core';
import { Key } from '../util/messages';
import { Article } from '../models/article.interface';
import { NotificationArticle } from '../models/notification-article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleStorageService {
  constructor() {}

  addNotificationStorage(valueNotification: NotificationArticle): void {
    const listObjNotificationStorage = this.getNotificationListStorage();
    listObjNotificationStorage.push(valueNotification);
    const serializedValue = JSON.stringify(listObjNotificationStorage);
    localStorage.setItem(Key.NOTIFICATION, serializedValue);
  }

  setNotificationStorage(valueNotification: NotificationArticle[]): void {
    const serializedValue = JSON.stringify(valueNotification);
    localStorage.setItem(Key.NOTIFICATION, serializedValue);
  }

  getNotificationListStorage() {
    const item = localStorage.getItem(Key.NOTIFICATION);
    if (item) {
      try {
        const parsedItem = JSON.parse(item);
        return Array.isArray(parsedItem) ? parsedItem : [parsedItem];
      } catch (error) {
        return [];
      }
    }
    return [];
  }

  removeNotificationStorage(): void {
    localStorage.removeItem(Key.NOTIFICATION);
  }

  addArticleStorage(valueArticleList: Article[]): void {
    const serializedValue = JSON.stringify(valueArticleList);
    localStorage.setItem(Key.ARTICLE, serializedValue);
  }

  getArticleListStorage() {
    const item = localStorage.getItem(Key.ARTICLE);
    if (item) {
      try {
        const parsedItem = JSON.parse(item);
        return Array.isArray(parsedItem) ? parsedItem : [parsedItem];
      } catch (error) {
        return [];
      }
    }
    return [];
  }

  removeArticleStorage(): void {
    localStorage.removeItem(Key.ARTICLE);
  }

  clearAllStorage(): void {
    localStorage.clear();
  }
}

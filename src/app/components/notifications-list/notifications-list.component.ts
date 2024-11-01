import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';

import { MatListModule } from '@angular/material/list';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationArticle } from 'src/app/models/notification-article.interface';

@Component({
  selector: 'app-notifications-list',
  standalone: true,
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatListModule,
  ],
})
export class NotificationsListComponent implements OnInit {
  notificationCount: number = 0;

  notifications: NotificationArticle[] = [];

  public showNotifications = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotificationObservable().subscribe({
      next: (data: NotificationArticle[]) => {
        this.notifications = data;

        const unseenNotifications = data.filter(
          (notification) => !notification.viewed
        );
        this.notificationCount = unseenNotifications.length;
      },
    });
  }

  toggleBadgeVisibility() {
    this.showNotifications = !this.showNotifications;
    this.notificationService.setAllNotificationAsViews();
  }

  public clearNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.notificationService.removeAllNotificationStorage();
    this.notificationService.setNotificationObservable([]);
  }

  @HostListener('document:click', ['$event'])
  private handleClickOutside(event: MouseEvent): void {
    const target = event.target as EventTarget;

    const clickedInsideButton =
      target instanceof Element && target.closest('button[mat-icon-button]');
    const clickedInsidePanel =
      target instanceof Element && target.closest('.notification-panel');

    if (this.showNotifications && !clickedInsidePanel && !clickedInsideButton) {
      this.showNotifications = !this.showNotifications;
    }
  }
}

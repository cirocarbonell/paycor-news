import { Injectable } from '@angular/core';
import { ConnectionService, ConnectionState } from 'ngx-connection-service';
import { tap } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { Messages } from '../util/messages';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkStatusService {
  private lastStateOnline: boolean | null = null;

  constructor(
    private connectionService: ConnectionService,
    private snackbarService: SnackbarService,
    private notificationService: NotificationService
  ) {}

  public statusControlNetworK() {
    this.connectionService
      .monitor()
      .pipe(
        tap((newState: ConnectionState) => {
          const isCurrentlyOnline = newState.hasNetworkConnection;

          if (this.lastStateOnline !== isCurrentlyOnline) {
            const dataCheck = this.lastStateOnline;
            this.lastStateOnline = isCurrentlyOnline;

            if (isCurrentlyOnline) {
              if (dataCheck != null) {
                this.showSaveNotifications(Messages.INTERNET_CONNECTED);
              }
            } else {
              this.showSaveNotifications(Messages.INTERNET_DISCONNECTED);
            }
          }
        })
      )
      .subscribe();
  }

  private showSaveNotifications(messages: string) {
    this.snackbarService.show(messages, Messages.CLOSED);
    this.notificationService.addNotification(messages);
  }
}

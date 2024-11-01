import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(
    message: string,
    action: string = 'Cerrar',
    duration: number = 3000
  ): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    };
    this.snackBar.open(message, action, config);
  }
}

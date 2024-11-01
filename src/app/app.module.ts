import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  ConnectionServiceOptions,
  ConnectionServiceOptionsToken,
} from 'ngx-connection-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: ConnectionServiceOptionsToken,
      useValue: <ConnectionServiceOptions>{
        enableHeartbeat: true,
        heartbeatUrl:
          environment.corsConnection +
          encodeURIComponent(environment.connectionStatusUrl),
        requestMethod: 'get',
        heartbeatInterval: 5000,
        heartbeatRetryInterval: 5000,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

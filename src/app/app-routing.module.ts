import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNewsComponent } from './pages/main-news/main-news.component';

const routes: Routes = [
  { path: 'news', component: MainNewsComponent },
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: '**', redirectTo: '/news' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

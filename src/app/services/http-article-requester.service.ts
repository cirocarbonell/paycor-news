import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TimesArticlesResponse } from '../models/times-articles-response.interface';
import { getFormatDate } from '../util/date';
import { Article } from '../models/article.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleRequester {
  private apiKey: string = environment.apiKey;
  private apiUrlArticle: string = environment.apiUrlArticle;
  private websiteNyTimes: string = environment.websiteNyTimes;

  constructor(private http: HttpClient) {}

  getArticlesFromTimes(): Observable<Article[]> {
    const dateNow = getFormatDate();

    return this.http
      .get<TimesArticlesResponse>(
        `${this.apiUrlArticle}${this.apiKey}&begin_date=${dateNow}`
      )
      .pipe(
        map((res) => {
          return res.response.docs.map((data: any) => ({
            title: data.headline.main,
            image:
              data.multimedia.length > 0
                ? `${this.websiteNyTimes}${data.multimedia[0].url}`
                : '',
            word_count: data.word_count,
          }));
        })
      );
  }
}

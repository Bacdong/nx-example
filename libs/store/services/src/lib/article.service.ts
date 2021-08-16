import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ApiResponse, ArticleList } from 'apps/store/src/app/core/models';
import { ApiService } from 'apps/store/src/app/core/services';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  limit: number = 2;
  sortby: string = 'oldest';

  articles = new Subject<ArticleList>();

  constructor(private apiService: ApiService) {}

  getArticleList(params: any) {
    this.apiService.get(
      `article/post?limit=${this.limit}&sortby=${this.sortby}`, 
      new HttpParams({ fromObject: params })
    ).subscribe((res: ApiResponse) => {
      if (!res.success) {
        alert(res.error_message);
        return;
      }

      this.articles.next(res.data);
    });
  }

  getArticleDetail(id: number) {
    this.apiService.get(`article/post/${id}`)
      .subscribe((res: ApiResponse) => {
        if (!res.success) {
          alert(res.error_message);
          return;
        }

        this.articles.next(res.data);
    });
  }
}
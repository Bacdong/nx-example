import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ApiResponse, Article } from "../models";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  limit: number = 10;

  articles = new Subject<Article[]>();
  article = new Subject<Article>();
  
  constructor(private apiService: ApiService) {}

  getArticleList(params: any) {
    this.apiService.get(
      `article/post?limit=${this.limit}`, 
      new HttpParams({ fromObject: params })
    ).subscribe((res: ApiResponse) => {
      if (!res.success) {
        console.log(res.error_message);
        return;
      }

      this.articles.next(res.data);
    });
  }

  getArticleDetail(id: number) {
    this.apiService.get(`article/post/${id}`).subscribe(
      (res: ApiResponse) => {
        if (!res.success) {
          console.log(res.error_message);
          return;
        }

        this.article.next(res.data);
      }
    );
  }
}
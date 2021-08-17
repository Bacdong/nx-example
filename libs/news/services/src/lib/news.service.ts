import { Injectable } from "@angular/core";
import { ApiService } from "apps/news/src/app/core/services";
import { Subject } from "rxjs";
import { ApiResponse, News, NewsList } from "apps/news/src/app/core/models";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  newsList = new Subject<NewsList>();
  newsDetail = new Subject<News>();
  newsAdd = new Subject<News>();
  newsDelete = new Subject<News>();

  constructor(private apiService: ApiService, private router: Router) {}

  fetchNewListByFilter(body: any) {
    this.apiService.post(`CMSTinTucDanhMucs/CMSTinTucDanhMucByFilters`, body)
      .subscribe((res: ApiResponse) => {
        if (!res.isOk) {
          alert(res.errorMessages);
          return;
        }

        this.newsList.next(res.result);
      });
  }

  updateNewsDetail(news: News) {
    this.apiService.put(`CMSTinTucDanhMucs`, news)
      .subscribe((res: ApiResponse) => {
        if (!res.isOk) {
          alert(res.errorMessages);
          return;
        }

        this.router.navigate(['/news/search']);
        this.newsDetail.next(res.result);
      });
  }

  createNews(news: News) {
    console.log('news', news);
    
    this.apiService.post(`CMSTinTucDanhMucs`, news)
      .subscribe((res: ApiResponse) => {
        if (!res.isOk) {
          alert(res.errorMessages);
          return;
        }
        
        this.router.navigate(['/news/search']);
        this.newsAdd.next(res.result);
      });
  }

  deleteNews(body: any) {
    this.apiService.delete(`CMSTinTucDanhMucs`, body)
      .subscribe((res: ApiResponse) => {
        if (!res.isOk) {
          alert(res.errorMessages);
          return;
        }

        this.router.navigate(['/news/search']);
        this.newsDelete.next(res.result);
      });
  }
}
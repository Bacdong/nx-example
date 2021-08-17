import { Injectable } from "@angular/core";
import { ApiService } from "apps/news/src/app/core/services";
import { Subject } from "rxjs";
import { ApiResponse, News, NewsList } from "apps/news/src/app/core/models";

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  newsList = new Subject<NewsList>();
  newsDetail = new Subject<News>();
  newsAdd = new Subject<News>();
  newsDelete = new Subject<News>();

  constructor(private apiService: ApiService) {}

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
    this.apiService.put(`CMSTinTucDanhMucs`, { news })
      .subscribe((res: ApiResponse) => {
        if (!res.isOk) {
          alert(res.errorMessages);
          return;
        }

        this.newsDetail.next(res.result);
      });
  }

  createNews(news: News) {
    this.apiService.post(`CMSTinTucDanhMucs`, { news })
      .subscribe((res: ApiResponse) => {
        if (!res.isOk) {
          alert(res.errorMessages);
          return;
        }

        this.newsAdd.next(res.result);
      });
  }

  deleteNews(body: any) {
    this.apiService.post(`CMSTinTucDanhMucs`, { body })
      .subscribe((res: ApiResponse) => {
        if (!res.isOk) {
          alert(res.errorMessages);
          return;
        }

        this.newsDelete.next(res.result);
      });
  }
}
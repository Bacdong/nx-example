import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthToken, NewsList } from 'apps/news/src/app/core/models';
import { AuthService } from 'apps/news/src/app/core/services';
import { NewsService } from 'libs/news/services';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'nx-example-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  subscription = new Subscription();
  newsList!: NewsList;
  public keyword: string = '';
  currentPage: number = 1;
  filterBody = {
    'pageSize': 0,
    'pageNumber': this.currentPage,
    'sortName': 'id',
    'sortASC': true,
    'keyword': this.keyword
  }

  credentials = {
    "userName": "khoand",
    "password": "1111",
    "sessionCode": "4cf86041-f1f8-4418-b3b1-3560f5bf0611" 
  }
  auth!: AuthToken;

  constructor(
    private router: Router,
    private newsService: NewsService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.login(this.credentials);
    this.authService.auth.pipe(take(1))
      .subscribe((auth: AuthToken) => {
        this.auth = auth;
        this.authService.setAuth(this.auth);
      })

    this.subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.reloadCurrentRoute();
        }
      })
    );

    // this._fetchNewsListByFilters(this.filterBody);
  }

  private _fetchNewsListByFilters(filters: any) {
    this.newsService.fetchNewListByFilter(filters);
    this.subscription.add(
      this.newsService.newsList.subscribe(
        (newsList: NewsList) => {this.newsList = newsList; console.log(this.newsList);
        }
      )
    )
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigateByUrl(currentUrl);
      })
  }

}

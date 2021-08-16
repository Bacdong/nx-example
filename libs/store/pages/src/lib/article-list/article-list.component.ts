import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Article, ArticleList } from 'apps/store/src/app/core/models';
import { ArticleService } from 'libs/store/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nx-example-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  articles!: ArticleList;
  filterParams: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.reloadCurrentRoute();
        }
      })
    );

    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        for (let key in params) {
          let value = params[key];
          if (value && value != '') {
            this.filterParams[key] = value;
          }
        }
  
        this._getArticleList(this.filterParams);
      })
    );
  }

  private _getArticleList(params: any) {
    this.articleService.getArticleList(params);
    this.subscription.add(
      this.articleService.articles.subscribe(
        (articles: ArticleList) => this.articles = articles
      )
    );
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    })
  }

}

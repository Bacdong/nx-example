import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Article } from 'apps/store/src/app/core/models';
import { ArticleService } from 'apps/store/src/app/core/services';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { extractUrl } from 'apps/store/src/app/core/ultils';

@Component({
  selector: 'nx-example-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  article!: Article;

  constructor(
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

    let url = this.router.url;
    let id = extractUrl(url);
    this._getArticleDetail(id);
  }

  private _getArticleDetail(id: any) {
    this.articleService.getArticleDetail(id);
    this.subscription.add(
      this.articleService.article.pipe(take(1))
        .subscribe((article: Article) => this.article = article)
    );
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    })
  }

}

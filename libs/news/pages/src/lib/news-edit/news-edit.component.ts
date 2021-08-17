import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NewsService } from '@nx-example/news/services';
import { News, NewsList } from 'apps/news/src/app/core/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nx-example-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  newsList!: NewsList;
  newsDetail!: News;
  filterBody = {
    'pageSize': 0,
    'pageNumber': 1,
    'sortName': 'id',
    'sortASC': true,
    'keyword': ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editForm = this.formBuilder.group({
    id: [null, Validators.required],
    tenDanhMuc: [null, Validators.required],
    ghiChu: ['test update', Validators.required],
    cssClass: ['test update', Validators.required],
    soThuTu: [0, Validators.required],
    isSuDung: [true, Validators.required],
    isBinhLuan: [null, Validators.required],
    idTemplate: [0, Validators.required],
    nameTemplate: ['test update', Validators.required],
    cultureId: [0, Validators.required],
    cultureName: ['test update', Validators.required],
    cultureIdMap: [0, Validators.required],
    forWeb: [0, Validators.required],
  });

  ngOnInit(): void {
    this.subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.reloadCurrentRoute();
        }
      })
    );

    this._fetchNewsList(this.filterBody);

    let id;
    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        for (let key in params) {
          let value = params[key];
          if (key == 'news_id') {
            id = value;
          }
        }
      })
    )
  }

  private _fetchNewsList(filters: any) {
    this.newsService.fetchNewListByFilter(filters);
    this.subscription.add(
      this.newsService.newsList.subscribe(
        (newsList: NewsList) => {this.newsList = newsList; console.log(this.newsList);
        }
      )
    )
  }

  updateNews() {
    let data = this.editForm.value;
    this.newsService.updateNewsDetail(data);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    })
  }

}

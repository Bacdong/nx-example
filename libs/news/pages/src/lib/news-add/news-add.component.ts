import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'libs/news/services/src/lib/news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nx-example-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent implements OnInit {

  constructor(
    private newsService: NewsService,
    private formBuilder: FormBuilder,
  ) { }

  createForm = this.formBuilder.group({
    tenDanhMuc: [null, Validators.required],
    ghiChu: ['test create', Validators.required],
    cssClass: ['test create', Validators.required],
    soThuTu: [0, Validators.required],
    isSuDung: ['true', Validators.required],
    isBinhLuan: ['null', Validators.required],
    idTemplate: [0, Validators.required],
    nameTemplate: ['test create', Validators.required],
    cultureId: [0, Validators.required],
    cultureName: ['test create', Validators.required],
    cultureIdMap: [0, Validators.required],
    forWeb: [0, Validators.required],
  });

  ngOnInit(): void {
  }

  createNews() {
    let data = this.createForm.value;
    console.log(data);
    
    this.newsService.createNews(data);
  }
}

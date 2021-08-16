import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'apps/store/src/app/core/models';

@Component({
  selector: 'nx-example-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  @Input() article!: Article;

  constructor() { }

  ngOnInit(): void {
  }

}

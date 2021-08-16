import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { PagesRoutingModule } from './pages-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
  ],
  declarations: [
    ArticleListComponent,
    ArticleItemComponent,
    ArticleDetailComponent
  ],
  exports: [RouterModule],
})
export class PagesModule {}

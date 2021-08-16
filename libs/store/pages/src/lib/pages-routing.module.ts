import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ArticleListComponent,
    children: [
      { path: 'item/:slug', component: ArticleDetailComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule {}
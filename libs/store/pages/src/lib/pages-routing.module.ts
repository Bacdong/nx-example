import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'articles/search', component: ArticleListComponent },
  { path: 'articles/:slug', component: ArticleDetailComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule {}
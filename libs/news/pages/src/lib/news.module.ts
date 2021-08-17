import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NewsRoutingModule,
  ],
  declarations: [
    NewsListComponent,
    NewsEditComponent,
    NewsAddComponent
  ],
})
export class NewsModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/articles' },
  { 
    path: 'articles', 
    loadChildren: () => import('libs/store/pages/src/lib/pages.module')
      .then(m => m.PagesModule),
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
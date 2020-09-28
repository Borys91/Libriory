import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
    { path: '', component: AuthorListComponent},
    { path: ':name/:surname', component: BookListComponent},
    { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

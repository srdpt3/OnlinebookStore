import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'category/:id', component: BookListComponent },
  { path: 'search/:keyword', component: BookListComponent },
  { path: 'books/:id', component: BookDetailsComponent },

  { path: '', redirectTo: '/books', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

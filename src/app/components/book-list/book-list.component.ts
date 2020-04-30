import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;

  searchMode: boolean;
  // pageIfItems: Array<Book>;

  // New properties for server size paging
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;


  constructor(private bookService: BookService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })
  }


  pageClick(pageIfItems: Array<Book>) {
    // this.pageIfItems = pageIfItems;

  }

  listBooks() {
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      //do search work
      this.handleSearchBooks();
    } else {
      //display books based on category
      this.handleListBooks();
    }

  }


  handleListBooks() {

    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
    console.log("hasCategoryId" + hasCategoryId);

    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }
    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    this.bookService.getBooks(this.currentCategoryId, this.currentPage - 1, this.pageSize).subscribe(


      // data = this.books = data;

      // this.books = data._embedded.books;
      // this.currentPage = data.page.number + 1;
      // this.totalRecords = data.page.totalElements;
      // this.pageSize = data.page.size;

      this.processingBookData())


  }
  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this.bookService.searchBooks(keyword).subscribe(data => {
      console.log(data);

      this.books = data;
    });
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

  processingBookData() {

    // This is what we are getting from server
    //   "page": {
    //     "size": 20,
    //     "totalElements": 40,
    //     "totalPages": 2,
    //     "number": 0
    // }


    return data => {
      this.books = data._embedded.books;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }

  }

}

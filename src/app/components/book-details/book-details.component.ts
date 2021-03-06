import { BookService } from 'src/app/services/book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book = new Book();

  constructor(private route: ActivatedRoute, private bookservice: BookService) { }
  ngOnInit() {
    this.route.paramMap.subscribe(
      () => {
        this.getBookInfo();
      }
    )
  }
  getBookInfo() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.bookservice.get(id).subscribe(data => {
      console.log("getbookinfo" + data);

      this.book = data;
    }
    );


  }

}

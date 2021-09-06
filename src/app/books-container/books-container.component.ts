import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss']
})
export class BooksContainerComponent implements OnInit {
  page: number = 1;
  search: string = "";
  books:any = [];
  sortAs: string = "0";
  data: any = {
    maxResults: 40,
    q: 'flowers+inauthor',
  }
  sortOptions: any = [
    {
      id: 'relevance',
      name: 'Relevance'
    },
    {
      id: 'newest',
      name: 'Newest'
    }
  ]
  constructor(
    private api: ApiService,
    private crd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getBooks(this.data);
  }

  getBooks(data){
    this.api.getBooks(data).subscribe(
      (res) => {
        this.books = res.items
        this.books = this.books.map((res) => {
          const result = {
            image: res.volumeInfo.imageLinks?.thumbnail,
            title: res.volumeInfo?.title,
            desc: res.volumeInfo?.description,
            authors:res.volumeInfo?.authors ? res.volumeInfo.authors[0] : "---",
            availablePdf: res.accessInfo?.pdf?.isAvailable || false,
            price: res.saleInfo?.retailPrice?.amount || 0,
            currencyCode: res.saleInfo?.listPrice?.currencyCode,
            notForSale: res.saleInfo?.saleability == "NOT_FOR_SALE" || false,
            pageCount: res.volumeInfo?.pageCount || '--'
          };
          return result;
        })
        this.crd.detectChanges();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getData(){
    if(this.search != "") this.data["q"] = this.search;
    if(this.sortAs != "0") this.data["orderBy"] = this.sortAs
    this.getBooks(this.data);
  }
}

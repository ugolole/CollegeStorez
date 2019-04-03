import { Component, Inject, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Product } from "../interfaces/product";
import { Store } from "../interfaces/store";

@Component({
  selector: "product-list",
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnChanges {
  @Input() store: Store; //this is to allow the Store to be retrieved from the store component.
  products: Product[];
  title: string;


  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router) {
    this.products = [];
  }

  //this is a life cycle hook that will trigger each time Angular sets a data-bound
  //input propertie
  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes['store'] !== "undefined") {
      // retrieve the store variable change info
      var change = changes['store'];
      // only perform the task if the value has been changed
      if (!change.isFirstChange()) {
        // execute the Http request and retrieve the result
        this.loadData();
      }
    }
  }

  loadData() {
    var url = this.baseUrl + "api/product/All/" + this.store.Id;
    this.http.get<Product[]>(url).subscribe(res => {
      this.products = res;
    }, error => console.error(error));
  }

  onCreate() {
    this.router.navigate(["/product/create", this.store.Id]);
  }

  onEdit(product: Product) {
    this.router.navigate(["/product/edit", product.Id]);
  }

  onDelete(product: Product) {
    if (confirm("Do you really want to delete this question?")) {
      var url = this.baseUrl + "api/question/" + product.Id;
      this.http
        .delete(url)
        .subscribe(res => {
          console.log("Product " + product.Id + " has been deleted.");
          // refresh the product list
            this.loadData();
        }, error => console.log(error));
    }
  }
}

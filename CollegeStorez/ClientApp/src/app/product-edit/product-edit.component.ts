import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Product } from '../interfaces/product';

@Component({
  selector: "product-edit",
  templateUrl: './prodcut-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent {
  title: string;
  product: Product;

  // this will be TRUE when editing an existing product,
  // FALSE when creating a new one.
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {

    // create an empty object from the Product  interface
    this.product = <Product>{};

    //get the id using short hand technique
    var id = +this.activatedRoute.snapshot.params["id"];

    // check if we're in edit mode or not
    this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");

    if (this.editMode) {
      // fetch the store from the server
      var url = this.baseUrl + "api/product/" + id;
      this.http.get<Product>(url).subscribe(res => {
        this.product = res;
        this.title = "Edit - " + this.product.Text;
      }, error => console.error(error));
    }
    else {
      this.product.StoreId = id;
      this.title = "Create a new Prodcut";
    }
  }

  onSubmit(product: Product) {
    var url = this.baseUrl + "api/question";
    if (this.editMode) {
      this.http
        .post<Product>(url, product)
        .subscribe(res => {
          var v = res;
          console.log("Product " + v.Id + " has been updated.");
          this.router.navigate(["store/edit", v.StoreId]);
        }, error => console.log(error));
    }
    else {
      this.http
        .put<Product>(url, product)
        .subscribe(res => {
          var v = res;
          console.log("Product " + v.Id + " has been created.");
          this.router.navigate(["store/edit", v.StoreId]);
        }, error => console.log(error));
    }
  }

  onBack() {
    this.router.navigate(["store/edit", this.product.StoreId]);
  }
}

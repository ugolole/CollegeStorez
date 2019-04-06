import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Order } from '../interfaces/Order';

import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: "order-edit",
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.less']
})

export class OrderEditComponent {
  title: string;
  order: Order;
  form: FormGroup;

  // this will be TRUE when editing an existing product,
  // FALSE when creating a new one.
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,

    @Inject('BASE_URL') private baseUrl: string) {

    // create an empty object from the Order  interface
    this.order = <Order>{};

    //get the id using short hand technique
    var id = +this.activatedRoute.snapshot.params["id"];

    // check if we're in edit mode or not
    this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");

    if (this.editMode) {
      // fetch the store from the server
      var url = this.baseUrl + "api/order/" + id;
      this.http.get<Order>(url).subscribe(res => {
        this.order = res;
        this.title = "Edit - " + this.order.Text;
      }, error => console.error(error));
    }
    else {
      this.order.ProductId = id;
      this.title = "Create a new Order";
    }
  }

  onSubmit(order: Order) {
    var url = this.baseUrl + "api/order";
    if (this.editMode) {
      this.http
        .post<Order>(url, order)
        .subscribe(res => {
          var v = res;
          console.log("Order " + v.Id + " has been updated.");
          this.router.navigate(["product/edit", v.ProductId]);
        }, error => console.log(error));
    }
    else {
      this.http
        .put<Order>(url, order)
        .subscribe(res => {
          var v = res;
          console.log("Order " + v.Id + " has been created.");
          this.router.navigate(["product/edit", v.ProductId]);
        }, error => console.log(error));
    }
  }

  onBack() {
    this.router.navigate(["product/edit", this.order.ProductId]);
  }
}

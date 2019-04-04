import { Component, Inject, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Product } from "../interfaces/product";
import { Order } from '../interfaces/order';


@Component({
  selector: "order-list",
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnChanges {
  @Input() product: Product;
  orders: Order[];
  title: string;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router) {
    this.orders = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes['product'] !== "undefined") {
      // retrieve the product variable change info
      var change = changes['product'];
      // only perform the task if the value has been changed
      if (!change.isFirstChange()) {
        // execute the Http request and retrieve the result
        this.loadData();
      }
    }
  }

  loadData() {
    var url = this.baseUrl + "api/order/All/" + this.product.Id;

    this.http.get<Order[]>(url).subscribe(res => {
      this.orders = res;
    }, error => console.error(error));
  }

  onCreate() {
    this.router.navigate(["/order/create", this.product.Id]);
  }

  onEdit(order: Order) {
    this.router.navigate(["/order/edit", order.Id]);
  }

  onDelete(order: Order) {
    if (confirm("Do you really want to delete this order?")) {
      var url = this.baseUrl + "api/order/" + order.Id;
      [246]
      this.http
        .delete(url)
        .subscribe(res => {
          console.log("Order " + order.Id + " has been deleted.");
          // refresh the product list
          this.loadData();
        }, error => console.log(error));
    }
  }
}

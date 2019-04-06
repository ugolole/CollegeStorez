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
    private fb: FormBuilder,
    @Inject('BASE_URL') private baseUrl: string) { //this make the baseUrl available through dependency injection.

    // create an empty object from the Order  interface
    this.order = <Order>{};

    //initialise the form
    this.createForm();

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

  onSubmit() {
    //create a temporary variable used to store the order
    var tempOrder = <Order>{};

    //assign the values found inside the form into the temporary order interface
    tempOrder.ProductId = this.order.ProductId;

    tempOrder.Text = this.form.value.Text;
    tempOrder.Value = this.form.value.Value;
    tempOrder.Note = this.form.value.Note;

    var url = this.baseUrl + "api/order";
    if (this.editMode) {

      //to prevent editing error assign the tempOrder id to order id
      tempOrder.Id = this.order.Id;

      this.http
        .post<Order>(url, tempOrder)
        .subscribe(res => {
          var v = res;
          console.log("Order " + v.Id + " has been updated.");
          this.router.navigate(["product/edit", v.ProductId]);
        }, error => console.log(error));
    }
    else {
      this.http
        .put<Order>(url, tempOrder)
        .subscribe(res => {
          var v = res;
          console.log("Order " + v.Id + " has been created.");
          this.router.navigate(["product/edit", v.ProductId]);
        }, error => console.log(error));
    }
  }

  //Method used to create the form
  createForm() {
    this.form = this.fb.group({
      Text: ['', Validators.required],
      Value: ['', Validators.required],
      Note : ''
    });
  }

  //merge newly created form with data found in the interface
  updateForm() {
    this.form.setValue({
      Text: this.order.Text,
      Value: this.order.Value,
      Note: this.order.Note
    });
  }

  //helper methods that will be used to validate the form we have created
  //get the form control
  getFormControl(name: string) {
    return this.form.get(name);
  }

  //return true if the form is valid
  isValid(name: string) {
    var e = this.getFormControl(name);
    return e && e.valid;
  }

  //return true if form control has changed
  isChanged(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }

  //return true if the form is valid after user changes
  hasError(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }

  onBack() {
    this.router.navigate(["product/edit", this.order.ProductId]);
  }
}

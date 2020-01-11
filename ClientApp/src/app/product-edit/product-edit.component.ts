import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Product } from '../interfaces/product';

import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "product-edit",
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.less']
})

export class ProductEditComponent {
  title: string;
  product: Product;
  form: FormGroup;

  // this will be TRUE when editing an existing product,
  // FALSE when creating a new one.
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject('BASE_URL') private baseUrl: string) {

    // create an empty object from the Product  interface
    this.product = <Product>{};

    //initialize the form
    this.createForm();

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
      this.product.StoreId = id; //assign StoreId foreign key to the current product being created. 
      this.title = "Create a new Prodcut";
    }
  }

  onSubmit() {

    //create a temporary variable to store product
    var tempProduct = <Product>{};

    //assign the values found inside the form to the temporary product interface
    //for submission
    tempProduct.Text = this.form.value.Text;
    tempProduct.ProductName = this.form.value.ProductName;
    tempProduct.ImagePath = this.form.value.ImagePath;
    tempProduct.StoreId = this.product.StoreId;

    var url = this.baseUrl + "api/product";
    if (this.editMode) {

      //in edit mode we need to assign the product id else there will be failure
      //In the previous design we didn't need to assign the id manual because it was coming from the product
      //parameter which has now been removed on the submit method.
      tempProduct.Id = this.product.Id;

      this.http
        .post<Product>(url, tempProduct)
        .subscribe(res => {
          var v = res;
          console.log("Product " + v.Id + " has been updated.");
          this.router.navigate(["store/edit", v.StoreId]);
        }, error => console.log(error));
    }
    else {
      this.http
        .put<Product>(url, tempProduct)
        .subscribe(res => {
          var v = res;
          console.log("Product " + v.Id + " has been created.");
          this.router.navigate(["store/edit", v.StoreId]);
        }, error => console.log(error));
    }
  }

  createForm() {
    this.form = this.fb.group({
      Text: ['', Validators.required],
      ProductName: ['', Validators.required],
      ImagePath: ['', Validators.required]
    });
  }

  //merge the newly created form with the data found inthe interface 
  updateForm() {
    this.form.setValue({
      Text: this.product.Text,
      ProductName: this.product.ProductName,
      ImagePath: this.product.ImagePath
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

  //return true if the form control has changed
  isChanged(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }

  //return true if the form control is valid after user changes
  hasError(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }

  onBack() {
    this.router.navigate(["store/edit", this.product.StoreId]);
  }
}

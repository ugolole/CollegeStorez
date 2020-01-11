import { Component, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Store } from "../interfaces/store";

import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: "store-edit",
  templateUrl: "./store-edit.component.html",
  styleUrls: ['./store-edit.component.less']
})

export class StoreEditComponent {
  store: Store;
  title: string;
  form: FormGroup;

  //this will be true when editing an existing quiz
  //false when creating a new one
  editMode: boolean;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private fb: FormBuilder) {

    //create an empty store from the store interface
    this.store = <Store>{};

    //initialize the form
    this.createForm();

    //acquire the id for that instance using a short hand technique
    var id = +this.activeRoute.snapshot.params["id"];

    if (id) {
      this.editMode = true;

      //fetch the store from server
      var url = this.baseUrl + 'api/store/' + id;

      //connect the server side data to the client side interface.
      this.http.get<Store>(url).subscribe(result => {
        this.store = result;
        this.title = "Edit - " + this.store.Title;

        //update the form with store value
        this.updateForm();
      }, error => console.error(error));
    } else {
      this.editMode = false;
      this.title = "Create a new Store";
    }
  }

  onSubmit() {
    //build a temporary object from form values
    var tempStore = <Store>{};

    tempStore.Title = this.form.value.Title;
    tempStore.Description = this.form.value.Description;
    tempStore.StoreName = this.form.value.StoreName;
    tempStore.Text = this.form.value.Text;


    var url = this.baseUrl + 'api/store';

    //With Edit mode binding is used to acquire the values allowing you to edit them
    //with easy.
    if (this.editMode) { //For editing the Store

      //we need to ensure that we are setting the tempStore ID of failure will occure
      tempStore.Id = this.store.Id;

      this.http
        .post<Store>(url, tempStore)
        .subscribe(result => {
          var v = result;
          console.log("Store " + v.Id + " has been updated");
          this.router.navigate(["home"]);
        }, error => console.log(error));
    } else { //For creating the Store 
      this.http
        .put<Store>(url, tempStore)
        .subscribe(result => {
          var s = result;
          console.log("Store " + s.Id + " has been created");
          this.router.navigate(["home"]);
        }, error => console.log(error));
    }
  }

  createForm() {
    this.form = this.fb.group({
      Title: ['', Validators.required],
      Description: '',
      Text: '',
      StoreName: ['', Validators.required]
    });
  }

  updateForm() {
    this.form.setValue({
      Title: this.store.Title,
      Description: this.store.Description,
      Text: this.store.Text,
      StoreName: this.store.StoreName
    });
  }

  //the helper methods that will allow us to easy the validation
  //process
  //retrieve a form control
  getFormControl(name: string) {
    return this.form.get(name);
  }

  //return true if a form control is valid
  isValid(name: string) {
    var e = this.getFormControl(name);
    return e && e.valid;
  }

  //return TRUE if the formControl has been changed
  isChanged(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }

  //return true if the form control is invalid after user changes
  hasError(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }

  onBack() {
    this.router.navigate(['home']);
  }
}

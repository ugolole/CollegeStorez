import { Component, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Store } from "../interfaces/store";


@Component({
  selector: "store-edit",
  templateUrl: "./store-edit.component.html",
  styleUrls: ['./store-edit.component.css']
})

export class StoreEditComponent {
  store: Store;
  title: string;

  //this will be true when editing an existing quiz
  //false when creating a new one
  editMode: boolean;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    //create an empty store from the store interface
    this.store = <Store>{};

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
      }, error => console.error(error));
    } else {
      this.editMode = false;
      this.title = "Create a new Store";
    }
  }

  onSubmit(store: Store) {
    var url = this.baseUrl + 'api/store';

    //With Edit mode binding is used to acquire the values allowing you to edit them
    //with easy.
    if (this.editMode) { //For editing the Store
      this.http
        .post<Store>(url, store)
        .subscribe(result => {
          var v = result;
          console.log("Store " + v.Id + " has been updated");
          this.router.navigate(["home"]);
        }, error => console.log(error));
    } else { //For creating the Store 
      this.http
        .put<Store>(url, store)
        .subscribe(result => {
          var s = result;
          console.log("Store " + s.Id + " has been created");
          this.router.navigate(["home"]);
        }, error => console.log(error));
    }
  }

  onBack() {
    this.router.navigate(['home']);
  }
}

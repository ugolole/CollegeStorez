import { Component, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Store } from "../interfaces/store";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'store',
  templateUrl: "./store.component.html",
  styleUrls: ['./store.component.less']
})

export class StoreComponent {
  store: Store;

  constructor(private activatedRouter: ActivatedRoute,
    private router: Router, private http: HttpClient,
    public auth: AuthService,
    @Inject('BASE_URL') private baseUrl: string) {

    //create an empty store from the store interface
    this.store = <Store>{};

    //get the id of the current activated route once the user clicks the button
    //this allows us to use this information to determine whether or not we can go to the
    //the next page containing the store information.
    var id = +this.activatedRouter.snapshot.params["id"];
    console.log(id);

    //make the store available through dependency injection.
    if (id) {
      //communicates with the server-side controllers to get the needed data
      var url = this.baseUrl + "api/store/" + id;

      //Merge the server side data with the client side interface to prepare information
      //for rendering into the server side.
      this.http.get<Store>(url).subscribe(result => {
        this.store = result;
      });
    } else {
      console.log("invalid id: routing back to home ...");
      this.router.navigate(['home']);
    }
  }

  //rediret to the store-edit component and pass the current id as well.
  onEdit() {
    this.router.navigate(["store/edit", this.store.Id]);
  }


  onDelete() {
    //the confirm is a javascript technique that adds a pop-up before the item gets
    //deleted that requires a user to confirm before deletion.
    if (confirm("Do you really want to delete this store?")) {
      var url = this.baseUrl + "api/store/" + this.store.Id;
      console.log("Url "+url)
      this.http
        .delete(url)
        .subscribe(res  => {
          console.log("Store " + this.store.Id + " has been deleted.");
          this.router.navigate(["home"]);
        }, error => console.log(error));
    }
  }
}

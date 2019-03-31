import { Component, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Store } from "../interfaces/store";

@Component({
  selector: "store",
  templateUrl: "./store.component.html",
  styleUrls: ['./store.component.css']
})

export class StoreComponent {
  store: Store;

  constructor(private activatedRouter: ActivatedRoute,
    private router: Router, private http: HttpClient,
    @Inject('Base_URL') private baseUrl: string) {

    //create an empty store from the store interface
    this.store = <Store>{};

    //get the id of the current activated route once the user clicks the button
    //this allows us to use this information to determine whether or not we can go to the
    //the next page containing the store information.
    var id = +this.activatedRouter.snapshot.params["id"];
    console.log(id);

    if (id) {
      var url = this.baseUrl + "api/store/" + id;

      this.http.get<Store>(url).subscribe(result => {
        this.store = result;
      });
    } else {
      console.log("invalid id: routing back to home ...");
      this.router.navigate(['home']);
    }
  }
}

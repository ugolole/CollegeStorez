import { Component, Inject, Input, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "../interfaces/store";

@Component({
  selector: 'store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})

export class StoreListComponent implements OnInit {
  @Input() class: string;
  title: string;
  selectedStore: Store;
  stores: Store[];
 

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private router: Router) { }

    ngOnInit(){
      console.log("StoresListComponent" + "instantiated with the following class: " + this.class);

      //acquire data from the server through the controllers
      var url = this.baseUrl + "api/store/";

      switch (this.class) {
        case "latest":
        default:
          this.title = "Latest Stores";
          url += "Latest/";
          break;
        case "byTitle":
          this.title = "By Title Stores";
          url += "ByTitle/";
          break;
        case "random":
          this.title = "Random Stores";
          url += "Random/";
          break;
      }

      //making the connection between the Json file return through the /api/--- variable
      //and the Store interface to allow aquisition of data.
      this.http.get<Store[]>(url).subscribe(result => {
        this.stores = result;
      }, error => console.error(error))
  }

  onSelect(store: Store) {
    this.selectedStore = store;
    console.log("store with id " + this.selectedStore.Id + " has been selected")
    this.router.navigate(["store", this.selectedStore.Id]);
  }
}

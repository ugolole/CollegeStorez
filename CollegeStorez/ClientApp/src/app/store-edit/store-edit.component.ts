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
}

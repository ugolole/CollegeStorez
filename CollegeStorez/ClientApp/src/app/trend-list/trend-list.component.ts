import { Component, Inject, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Trend } from '../interfaces/trend';
import { Store } from '../interfaces/store';

@Component({
  selector: "trend-list",
  templateUrl: './trend-list.component.html',
  styleUrls: ['./trend-list.component.css']
})

export class TrendListComponent implements OnChanges {
  @Input() store: Store;
  trends: Trend[];
  title: string;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router) {

    this.trends = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes['store'] !== "undefined") {

      // retrieve the store variable change info
      var change = changes['store'];

      // only perform the task if the value has been changed
      if (!change.isFirstChange()) {
        // execute the Http request and retrieve the result
        this.loadData();
      }
    }
  }

  loadData() {
    var url = this.baseUrl + "api/trend/All/" + this.store.Id;
    this.http.get<Trend[]>(url).subscribe(result => {
      this.trends = result;
    }, error => console.error(error));
  }

  onCreate() {
    this.router.navigate(["/trend/create", this.store.Id]);
  }

  onEdit(trend: Trend) {
    this.router.navigate(["/trend/edit", trend.Id]);
  }

  onDelete(trend: Trend) {
    if (confirm("Do you really want to delete this trend?")) {
      var url = this.baseUrl + "api/trend/" + trend.Id;
      this.http
        .delete(url)
        .subscribe(res => {
          console.log("Trend " + trend.Id + " has been deleted.");

          // refresh the result list
          this.loadData();
        }, error => console.log(error));
    }
  }
}

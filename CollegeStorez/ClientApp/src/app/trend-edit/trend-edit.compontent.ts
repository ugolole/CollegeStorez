import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Trend } from "../interfaces/trend";

@Component({
  selector: "trend-edit",
  templateUrl: './trend-edit.component.html',
  styleUrls: ['./trend-edit.component.less']
})

export class TrendEditComponent {
  title: string;
  trend: Trend;

  // this will be TRUE when editing an existing trend, 
  //   FALSE when creating a new one.
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {

    // create an empty object from the Quiz interface
    this.trend = <Trend>{};

    var id = +this.activatedRoute.snapshot.params["id"];

    // quick & dirty way to check if we're in edit mode or not
    this.editMode = (this.activatedRoute.snapshot.url[1].path == "edit");

    if (this.editMode) {

      // fetch the trend from the server
      var url = this.baseUrl + "api/trend/" + id;
      this.http.get<Trend>(url).subscribe(res => {
        this.trend = res;
        this.title = "Edit - " + this.trend.Text;
      }, error => console.error(error));
    }
    else {
      this.trend.StoreId = id;
      this.title = "Create a new Trend";
    }
  }

  onSubmit(trend: Trend) {
    var url = this.baseUrl + "api/trend";

    if (this.editMode) {
      this.http
        .post<Trend>(url, trend)
        .subscribe(res => {
          var v = res;
          console.log("Trend " + v.Id + " has been updated.");
          this.router.navigate(["store/edit", v.StoreId]);
        }, error => console.log(error));
    }
    else {
      this.http
        .put<Trend>(url, trend)
        .subscribe(res => {
          var v = res;
          console.log("Result " + v.Id + " has been created.");
          this.router.navigate(["store/edit", v.StoreId]);
        }, error => console.log(error));
    }
  }

  onBack() {
    this.router.navigate(["store/edit", this.trend.StoreId]);
  }
}

import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Trend } from "../interfaces/trend";

import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: "trend-edit",
  templateUrl: './trend-edit.component.html',
  styleUrls: ['./trend-edit.component.less']
})

export class TrendEditComponent {
  title: string;
  trend: Trend;
  form: FormGroup;

  // this will be TRUE when editing an existing trend, 
  //   FALSE when creating a new one.
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject('BASE_URL') private baseUrl: string) {

    // create an empty object from the Quiz interface
    this.trend = <Trend>{};

    //initialise the form
    this.createForm();

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
      this.trend.StoreId = id; //specify the the foreign id when creating the trend
      this.title = "Create a new Trend";
    }
  }

  onSubmit() {
    //create temporary trend interface to store the data
    var tempTrend = <Trend>{};

    //assign the values found inside the form to the temporary interface
    //for submission
    tempTrend.StoreId = this.trend.StoreId;
    tempTrend.Text = this.form.value.Text;
    tempTrend.Notes = this.form.value.Notes;
    tempTrend.Views = this.form.value.Views;

    var url = this.baseUrl + "api/trend";

    if (this.editMode) {

      //assign the tempTrend id from the previously created trend table
      tempTrend.Id = this.trend.Id;

      this.http
        .post<Trend>(url, tempTrend)
        .subscribe(res => {
          var v = res;
          console.log("Trend " + v.Id + " has been updated.");
          this.router.navigate(["store/edit", v.StoreId]);
        }, error => console.log(error));
    }
    else {
      this.http
        .put<Trend>(url, tempTrend)
        .subscribe(res => {
          var v = res;
          console.log("Result " + v.Id + " has been created.");
          this.router.navigate(["store/edit", v.StoreId]);
        }, error => console.log(error));
    }
  }

  //method that will allow us to create a form group
  createForm() {
    this.form = this.fb.group({
      Text: ['', Validators.required],
      Notes: '',
      Views: ['', Validators.required]
    });
  }

  //helper methods that will be used to validate the form we have created
  //get the form control
  getFormControl(name: string) {
    return this.form.get(name);
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
    this.router.navigate(["store/edit", this.trend.StoreId]);
  }
}

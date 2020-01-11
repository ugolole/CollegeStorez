"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var TrendEditComponent = /** @class */ (function () {
    function TrendEditComponent(activatedRoute, router, http, fb, baseUrl) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.fb = fb;
        this.baseUrl = baseUrl;
        // create an empty object from the Quiz interface
        this.trend = {};
        //initialise the form
        this.createForm();
        var id = +this.activatedRoute.snapshot.params["id"];
        // quick & dirty way to check if we're in edit mode or not
        this.editMode = (this.activatedRoute.snapshot.url[1].path == "edit");
        if (this.editMode) {
            // fetch the trend from the server
            var url = this.baseUrl + "api/trend/" + id;
            this.http.get(url).subscribe(function (res) {
                _this.trend = res;
                _this.title = "Edit - " + _this.trend.Text;
            }, function (error) { return console.error(error); });
        }
        else {
            this.trend.StoreId = id; //specify the the foreign id when creating the trend
            this.title = "Create a new Trend";
        }
    }
    TrendEditComponent.prototype.onSubmit = function () {
        var _this = this;
        //create temporary trend interface to store the data
        var tempTrend = {};
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
                .post(url, tempTrend)
                .subscribe(function (res) {
                var v = res;
                console.log("Trend " + v.Id + " has been updated.");
                _this.router.navigate(["store/edit", v.StoreId]);
            }, function (error) { return console.log(error); });
        }
        else {
            this.http
                .put(url, tempTrend)
                .subscribe(function (res) {
                var v = res;
                console.log("Result " + v.Id + " has been created.");
                _this.router.navigate(["store/edit", v.StoreId]);
            }, function (error) { return console.log(error); });
        }
    };
    //method that will allow us to create a form group
    TrendEditComponent.prototype.createForm = function () {
        this.form = this.fb.group({
            Text: ['', forms_1.Validators.required],
            Notes: '',
            Views: ['', forms_1.Validators.required]
        });
    };
    //helper methods that will be used to validate the form we have created
    //get the form control
    TrendEditComponent.prototype.getFormControl = function (name) {
        return this.form.get(name);
    };
    //return true if the form control has changed
    TrendEditComponent.prototype.isChanged = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    };
    //return true if the form control is valid after user changes
    TrendEditComponent.prototype.hasError = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    };
    TrendEditComponent.prototype.onBack = function () {
        this.router.navigate(["store/edit", this.trend.StoreId]);
    };
    TrendEditComponent = __decorate([
        core_1.Component({
            selector: "trend-edit",
            templateUrl: './trend-edit.component.html',
            styleUrls: ['./trend-edit.component.less']
        }),
        __param(4, core_1.Inject('BASE_URL'))
    ], TrendEditComponent);
    return TrendEditComponent;
}());
exports.TrendEditComponent = TrendEditComponent;
//# sourceMappingURL=trend-edit.compontent.js.map
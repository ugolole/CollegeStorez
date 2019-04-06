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
var OrderEditComponent = /** @class */ (function () {
    function OrderEditComponent(activatedRoute, router, http, fb, baseUrl) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.fb = fb;
        this.baseUrl = baseUrl;
        // create an empty object from the Order  interface
        this.order = {};
        //initialise the form
        this.createForm();
        //get the id using short hand technique
        var id = +this.activatedRoute.snapshot.params["id"];
        // check if we're in edit mode or not
        this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");
        if (this.editMode) {
            // fetch the store from the server
            var url = this.baseUrl + "api/order/" + id;
            this.http.get(url).subscribe(function (res) {
                _this.order = res;
                _this.title = "Edit - " + _this.order.Text;
            }, function (error) { return console.error(error); });
        }
        else {
            this.order.ProductId = id;
            this.title = "Create a new Order";
        }
    }
    OrderEditComponent.prototype.onSubmit = function () {
        var _this = this;
        //create a temporary variable used to store the order
        var tempOrder = {};
        //assign the values found inside the form into the temporary order interface
        tempOrder.ProductId = this.order.ProductId;
        tempOrder.Text = this.form.value.Text;
        tempOrder.Value = this.form.value.Value;
        tempOrder.Note = this.form.value.Note;
        var url = this.baseUrl + "api/order";
        if (this.editMode) {
            //to prevent editing error assign the tempOrder id to order id
            tempOrder.Id = this.order.Id;
            this.http
                .post(url, tempOrder)
                .subscribe(function (res) {
                var v = res;
                console.log("Order " + v.Id + " has been updated.");
                _this.router.navigate(["product/edit", v.ProductId]);
            }, function (error) { return console.log(error); });
        }
        else {
            this.http
                .put(url, tempOrder)
                .subscribe(function (res) {
                var v = res;
                console.log("Order " + v.Id + " has been created.");
                _this.router.navigate(["product/edit", v.ProductId]);
            }, function (error) { return console.log(error); });
        }
    };
    //Method used to create the form
    OrderEditComponent.prototype.createForm = function () {
        this.form = this.fb.group({
            Text: ['', forms_1.Validators.required],
            Value: ['', forms_1.Validators.required],
            Note: ''
        });
    };
    //merge newly created form with data found in the interface
    OrderEditComponent.prototype.updateForm = function () {
        this.form.setValue({
            Text: this.order.Text,
            Value: this.order.Value,
            Note: this.order.Note
        });
    };
    //helper methods that will be used to validate the form we have created
    //get the form control
    OrderEditComponent.prototype.getFormControl = function (name) {
        return this.form.get(name);
    };
    //return true if the form is valid
    OrderEditComponent.prototype.isValid = function (name) {
        var e = this.getFormControl(name);
        return e && e.valid;
    };
    //return true if form control has changed
    OrderEditComponent.prototype.isChanged = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    };
    //return true if the form is valid after user changes
    OrderEditComponent.prototype.hasError = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    };
    OrderEditComponent.prototype.onBack = function () {
        this.router.navigate(["product/edit", this.order.ProductId]);
    };
    OrderEditComponent = __decorate([
        core_1.Component({
            selector: "order-edit",
            templateUrl: './order-edit.component.html',
            styleUrls: ['./order-edit.component.less']
        }),
        __param(4, core_1.Inject('BASE_URL'))
    ], OrderEditComponent);
    return OrderEditComponent;
}());
exports.OrderEditComponent = OrderEditComponent;
//# sourceMappingURL=order-edit.component.js.map
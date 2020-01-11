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
var ProductEditComponent = /** @class */ (function () {
    function ProductEditComponent(activatedRoute, router, http, fb, baseUrl) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.fb = fb;
        this.baseUrl = baseUrl;
        // create an empty object from the Product  interface
        this.product = {};
        //initialize the form
        this.createForm();
        //get the id using short hand technique
        var id = +this.activatedRoute.snapshot.params["id"];
        // check if we're in edit mode or not
        this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");
        if (this.editMode) {
            // fetch the store from the server
            var url = this.baseUrl + "api/product/" + id;
            this.http.get(url).subscribe(function (res) {
                _this.product = res;
                _this.title = "Edit - " + _this.product.Text;
            }, function (error) { return console.error(error); });
        }
        else {
            this.product.StoreId = id; //assign StoreId foreign key to the current product being created. 
            this.title = "Create a new Prodcut";
        }
    }
    ProductEditComponent.prototype.onSubmit = function () {
        var _this = this;
        //create a temporary variable to store product
        var tempProduct = {};
        //assign the values found inside the form to the temporary product interface
        //for submission
        tempProduct.Text = this.form.value.Text;
        tempProduct.ProductName = this.form.value.ProductName;
        tempProduct.ImagePath = this.form.value.ImagePath;
        tempProduct.StoreId = this.product.StoreId;
        var url = this.baseUrl + "api/product";
        if (this.editMode) {
            //in edit mode we need to assign the product id else there will be failure
            //In the previous design we didn't need to assign the id manual because it was coming from the product
            //parameter which has now been removed on the submit method.
            tempProduct.Id = this.product.Id;
            this.http
                .post(url, tempProduct)
                .subscribe(function (res) {
                var v = res;
                console.log("Product " + v.Id + " has been updated.");
                _this.router.navigate(["store/edit", v.StoreId]);
            }, function (error) { return console.log(error); });
        }
        else {
            this.http
                .put(url, tempProduct)
                .subscribe(function (res) {
                var v = res;
                console.log("Product " + v.Id + " has been created.");
                _this.router.navigate(["store/edit", v.StoreId]);
            }, function (error) { return console.log(error); });
        }
    };
    ProductEditComponent.prototype.createForm = function () {
        this.form = this.fb.group({
            Text: ['', forms_1.Validators.required],
            ProductName: ['', forms_1.Validators.required],
            ImagePath: ['', forms_1.Validators.required]
        });
    };
    //merge the newly created form with the data found inthe interface 
    ProductEditComponent.prototype.updateForm = function () {
        this.form.setValue({
            Text: this.product.Text,
            ProductName: this.product.ProductName,
            ImagePath: this.product.ImagePath
        });
    };
    //helper methods that will be used to validate the form we have created
    //get the form control
    ProductEditComponent.prototype.getFormControl = function (name) {
        return this.form.get(name);
    };
    //return true if the form is valid
    ProductEditComponent.prototype.isValid = function (name) {
        var e = this.getFormControl(name);
        return e && e.valid;
    };
    //return true if the form control has changed
    ProductEditComponent.prototype.isChanged = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    };
    //return true if the form control is valid after user changes
    ProductEditComponent.prototype.hasError = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    };
    ProductEditComponent.prototype.onBack = function () {
        this.router.navigate(["store/edit", this.product.StoreId]);
    };
    ProductEditComponent = __decorate([
        core_1.Component({
            selector: "product-edit",
            templateUrl: './product-edit.component.html',
            styleUrls: ['./product-edit.component.less']
        }),
        __param(4, core_1.Inject('BASE_URL'))
    ], ProductEditComponent);
    return ProductEditComponent;
}());
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map
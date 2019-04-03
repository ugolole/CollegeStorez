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
var ProductEditComponent = /** @class */ (function () {
    function ProductEditComponent(activatedRoute, router, http, baseUrl) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.baseUrl = baseUrl;
        // create an empty object from the Product  interface
        this.product = {};
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
            this.product.StoreId = id;
            this.title = "Create a new Prodcut";
        }
    }
    ProductEditComponent.prototype.onSubmit = function (product) {
        var _this = this;
        var url = this.baseUrl + "api/question";
        if (this.editMode) {
            this.http
                .post(url, product)
                .subscribe(function (res) {
                var v = res;
                console.log("Product " + v.Id + " has been updated.");
                _this.router.navigate(["store/edit", v.StoreId]);
            }, function (error) { return console.log(error); });
        }
        else {
            this.http
                .put(url, product)
                .subscribe(function (res) {
                var v = res;
                console.log("Product " + v.Id + " has been created.");
                _this.router.navigate(["store/edit", v.StoreId]);
            }, function (error) { return console.log(error); });
        }
    };
    ProductEditComponent.prototype.onBack = function () {
        this.router.navigate(["store/edit", this.product.StoreId]);
    };
    ProductEditComponent = __decorate([
        core_1.Component({
            selector: "product-edit",
            templateUrl: './prodcut-edit.component.html',
            styleUrls: ['./product-edit.component.css']
        }),
        __param(3, core_1.Inject('BASE_URL'))
    ], ProductEditComponent);
    return ProductEditComponent;
}());
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map
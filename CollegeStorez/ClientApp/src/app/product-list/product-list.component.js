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
var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(http, baseUrl, router) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.router = router;
        this.products = [];
    }
    //this is a life cycle hook that will trigger each time Angular sets a data-bound
    //input propertie
    ProductListComponent.prototype.ngOnChanges = function (changes) {
        if (typeof changes['store'] !== "undefined") {
            // retrieve the store variable change info
            var change = changes['store'];
            // only perform the task if the value has been changed
            if (!change.isFirstChange()) {
                // execute the Http request and retrieve the result
                this.loadData();
            }
        }
    };
    ProductListComponent.prototype.loadData = function () {
        var _this = this;
        var url = this.baseUrl + "api/product/All/" + this.store.Id;
        this.http.get(url).subscribe(function (res) {
            _this.products = res;
        }, function (error) { return console.error(error); });
    };
    ProductListComponent.prototype.onCreate = function () {
        this.router.navigate(["/product/create", this.store.Id]);
    };
    ProductListComponent.prototype.onEdit = function (product) {
        this.router.navigate(["/product/edit", product.Id]);
    };
    ProductListComponent.prototype.onDelete = function (product) {
        var _this = this;
        if (confirm("Do you really want to delete this question?")) {
            var url = this.baseUrl + "api/product/" + product.Id;
            this.http
                .delete(url)
                .subscribe(function (res) {
                console.log("Product " + product.Id + " has been deleted.");
                // refresh the product list
                _this.loadData();
            }, function (error) { return console.log(error); });
        }
    };
    __decorate([
        core_1.Input()
    ], ProductListComponent.prototype, "store", void 0);
    ProductListComponent = __decorate([
        core_1.Component({
            selector: "product-list",
            templateUrl: './product-list.component.html',
            styleUrls: ['./product-list.component.css']
        }),
        __param(1, core_1.Inject('BASE_URL'))
    ], ProductListComponent);
    return ProductListComponent;
}());
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product-list.component.js.map
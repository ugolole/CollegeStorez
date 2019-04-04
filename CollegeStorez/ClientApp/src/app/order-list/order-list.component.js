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
var OrderListComponent = /** @class */ (function () {
    function OrderListComponent(http, baseUrl, router) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.router = router;
        this.orders = [];
    }
    OrderListComponent.prototype.ngOnChanges = function (changes) {
        if (typeof changes['product'] !== "undefined") {
            // retrieve the product variable change info
            var change = changes['product'];
            // only perform the task if the value has been changed
            if (!change.isFirstChange()) {
                // execute the Http request and retrieve the result
                this.loadData();
            }
        }
    };
    OrderListComponent.prototype.loadData = function () {
        var _this = this;
        var url = this.baseUrl + "api/order/All/" + this.product.Id;
        this.http.get(url).subscribe(function (res) {
            _this.orders = res;
        }, function (error) { return console.error(error); });
    };
    OrderListComponent.prototype.onCreate = function () {
        this.router.navigate(["/order/create", this.product.Id]);
    };
    OrderListComponent.prototype.onEdit = function (order) {
        this.router.navigate(["/order/edit", order.Id]);
    };
    OrderListComponent.prototype.onDelete = function (order) {
        var _this = this;
        if (confirm("Do you really want to delete this order?")) {
            var url = this.baseUrl + "api/order/" + order.Id;
            [246];
            this.http
                .delete(url)
                .subscribe(function (res) {
                console.log("Order " + order.Id + " has been deleted.");
                // refresh the product list
                _this.loadData();
            }, function (error) { return console.log(error); });
        }
    };
    __decorate([
        core_1.Input()
    ], OrderListComponent.prototype, "product", void 0);
    OrderListComponent = __decorate([
        core_1.Component({
            selector: "order-list",
            templateUrl: './order-list.component.html',
            styleUrls: ['./order-list.component.less']
        }),
        __param(1, core_1.Inject('BASE_URL'))
    ], OrderListComponent);
    return OrderListComponent;
}());
exports.OrderListComponent = OrderListComponent;
//# sourceMappingURL=order-list.component.js.map
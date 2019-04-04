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
var OrderEditComponent = /** @class */ (function () {
    function OrderEditComponent(activatedRoute, router, http, baseUrl) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.http = http;
        this.baseUrl = baseUrl;
        // create an empty object from the Order  interface
        this.order = {};
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
    OrderEditComponent.prototype.onSubmit = function (order) {
        var _this = this;
        var url = this.baseUrl + "api/order";
        if (this.editMode) {
            this.http
                .post(url, order)
                .subscribe(function (res) {
                var v = res;
                console.log("Order " + v.Id + " has been updated.");
                _this.router.navigate(["product/edit", v.ProductId]);
            }, function (error) { return console.log(error); });
        }
        else {
            this.http
                .put(url, order)
                .subscribe(function (res) {
                var v = res;
                console.log("Order " + v.Id + " has been created.");
                _this.router.navigate(["product/edit", v.ProductId]);
            }, function (error) { return console.log(error); });
        }
    };
    OrderEditComponent.prototype.onBack = function () {
        this.router.navigate(["product/edit", this.order.ProductId]);
    };
    OrderEditComponent = __decorate([
        core_1.Component({
            selector: "order-edit",
            templateUrl: './order-edit.component.html',
            styleUrls: ['./order-edit.component.css']
        }),
        __param(3, core_1.Inject('BASE_URL'))
    ], OrderEditComponent);
    return OrderEditComponent;
}());
exports.OrderEditComponent = OrderEditComponent;
//# sourceMappingURL=order-edit.component.js.map
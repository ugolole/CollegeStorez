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
var TrendListComponent = /** @class */ (function () {
    function TrendListComponent(http, baseUrl, router) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.router = router;
        this.trends = [];
    }
    TrendListComponent.prototype.ngOnChanges = function (changes) {
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
    TrendListComponent.prototype.loadData = function () {
        var _this = this;
        var url = this.baseUrl + "api/trend/All/" + this.store.Id;
        this.http.get(url).subscribe(function (result) {
            _this.trends = result;
        }, function (error) { return console.error(error); });
    };
    TrendListComponent.prototype.onCreate = function () {
        this.router.navigate(["/trend/create", this.store.Id]);
    };
    TrendListComponent.prototype.onEdit = function (trend) {
        this.router.navigate(["/trend/edit", trend.Id]);
    };
    TrendListComponent.prototype.onDelete = function (trend) {
        var _this = this;
        if (confirm("Do you really want to delete this trend?")) {
            var url = this.baseUrl + "api/trend/" + trend.Id;
            this.http
                .delete(url)
                .subscribe(function (res) {
                console.log("Trend " + trend.Id + " has been deleted.");
                // refresh the result list
                _this.loadData();
            }, function (error) { return console.log(error); });
        }
    };
    __decorate([
        core_1.Input()
    ], TrendListComponent.prototype, "store", void 0);
    TrendListComponent = __decorate([
        core_1.Component({
            selector: "trend-list",
            templateUrl: './trend-list.component.html',
            styleUrls: ['./trend-list.component.less']
        }),
        __param(1, core_1.Inject('BASE_URL'))
    ], TrendListComponent);
    return TrendListComponent;
}());
exports.TrendListComponent = TrendListComponent;
//# sourceMappingURL=trend-list.component.js.map
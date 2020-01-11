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
var StoreListComponent = /** @class */ (function () {
    function StoreListComponent(http, baseUrl, router) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.router = router;
    }
    StoreListComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("StoresListComponent" + "instantiated with the following class: " + this.class);
        //acquire data from the server through the controllers
        var url = this.baseUrl + "api/store/";
        switch (this.class) {
            case "latest":
            default:
                this.title = "Latest Stores";
                url += "Latest/";
                break;
            case "byTitle":
                this.title = "By Title Stores";
                url += "ByTitle/";
                break;
            case "random":
                this.title = "Random Stores";
                url += "Random/";
                break;
        }
        //making the connection between the Json file return through the /api/--- variable
        //and the Store interface to allow aquisition of data.
        this.http.get(url).subscribe(function (result) {
            _this.stores = result;
        }, function (error) { return console.error(error); });
    };
    StoreListComponent.prototype.onSelect = function (store) {
        this.selectedStore = store;
        console.log("store with id " + this.selectedStore.Id + " has been selected");
        this.router.navigate(["store", this.selectedStore.Id]);
    };
    __decorate([
        core_1.Input()
    ], StoreListComponent.prototype, "class", void 0);
    StoreListComponent = __decorate([
        core_1.Component({
            selector: 'store-list',
            templateUrl: './store-list.component.html',
            styleUrls: ['./store-list.component.css']
        }),
        __param(1, core_1.Inject('BASE_URL'))
    ], StoreListComponent);
    return StoreListComponent;
}());
exports.StoreListComponent = StoreListComponent;
//# sourceMappingURL=store-list.component.js.map
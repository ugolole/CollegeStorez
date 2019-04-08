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
var StoreComponent = /** @class */ (function () {
    function StoreComponent(activatedRouter, router, http, auth, baseUrl) {
        var _this = this;
        this.activatedRouter = activatedRouter;
        this.router = router;
        this.http = http;
        this.auth = auth;
        this.baseUrl = baseUrl;
        //create an empty store from the store interface
        this.store = {};
        //get the id of the current activated route once the user clicks the button
        //this allows us to use this information to determine whether or not we can go to the
        //the next page containing the store information.
        var id = +this.activatedRouter.snapshot.params["id"];
        console.log(id);
        if (id) {
            //communicates with the server-side controllers to get the needed data
            var url = this.baseUrl + "api/store/" + id;
            //Merge the server side data with the client side interface to prepare information
            //for rendering into the server side.
            this.http.get(url).subscribe(function (result) {
                _this.store = result;
            });
        }
        else {
            console.log("invalid id: routing back to home ...");
            this.router.navigate(['home']);
        }
    }
    //rediret to the store-edit component and pass the current id as well.
    StoreComponent.prototype.onEdit = function () {
        this.router.navigate(["store/edit", this.store.Id]);
    };
    StoreComponent.prototype.onDelete = function () {
        var _this = this;
        //the confirm is a javascript technique that adds a pop-up before the item gets
        //deleted that requires a user to confirm before deletion.
        if (confirm("Do you really want to delete this store?")) {
            var url = this.baseUrl + "api/store/" + this.store.Id;
            console.log("Url " + url);
            this.http
                .delete(url)
                .subscribe(function (res) {
                console.log("Store " + _this.store.Id + " has been deleted.");
                _this.router.navigate(["home"]);
            }, function (error) { return console.log(error); });
        }
    };
    StoreComponent = __decorate([
        core_1.Component({
            selector: 'store',
            templateUrl: "./store.component.html",
            styleUrls: ['./store.component.less']
        }),
        __param(4, core_1.Inject('BASE_URL'))
    ], StoreComponent);
    return StoreComponent;
}());
exports.StoreComponent = StoreComponent;
//# sourceMappingURL=store.component.js.map
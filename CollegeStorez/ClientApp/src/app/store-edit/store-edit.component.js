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
var StoreEditComponent = /** @class */ (function () {
    function StoreEditComponent(activeRoute, router, http, baseUrl) {
        var _this = this;
        this.activeRoute = activeRoute;
        this.router = router;
        this.http = http;
        this.baseUrl = baseUrl;
        //create an empty store from the store interface
        this.store = {};
        //acquire the id for that instance using a short hand technique
        var id = +this.activeRoute.snapshot.params["id"];
        if (id) {
            this.editMode = true;
            //fetch the store from server
            var url = this.baseUrl + 'api/store/' + id;
            //connect the server side data to the client side interface.
            this.http.get(url).subscribe(function (result) {
                _this.store = result;
                _this.title = "Edit - " + _this.store.Title;
            }, function (error) { return console.error(error); });
        }
        else {
            this.editMode = false;
            this.title = "Create a new Store";
        }
    }
    StoreEditComponent.prototype.onSubmit = function (store) {
        var _this = this;
        var url = this.baseUrl + 'api/store';
        //With Edit mode binding is used to acquire the values allowing you to edit them
        //with easy.
        if (this.editMode) { //For editing the Store
            this.http
                .post(url, store)
                .subscribe(function (result) {
                var v = result;
                console.log("Store " + v.Id + " has been updated");
                _this.router.navigate(["home"]);
            }, function (error) { return console.log(error); });
        }
        else { //For creating the Store 
            this.http
                .put(url, store)
                .subscribe(function (result) {
                var s = result;
                console.log("Store " + s.Id + " has been created");
                _this.router.navigate(["home"]);
            }, function (error) { return console.log(error); });
        }
    };
    StoreEditComponent.prototype.onBack = function () {
        this.router.navigate(['home']);
    };
    StoreEditComponent = __decorate([
        core_1.Component({
            selector: "store-edit",
            templateUrl: "./store-edit.component.html",
            styleUrls: ['./store-edit.component.css']
        }),
        __param(3, core_1.Inject('BASE_URL'))
    ], StoreEditComponent);
    return StoreEditComponent;
}());
exports.StoreEditComponent = StoreEditComponent;
//# sourceMappingURL=store-edit.component.js.map
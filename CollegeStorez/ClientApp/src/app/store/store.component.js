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
    function StoreComponent(activatedRouter, router, http, baseUrl) {
        var _this = this;
        this.activatedRouter = activatedRouter;
        this.router = router;
        this.http = http;
        this.baseUrl = baseUrl;
        //create an empty store from the store interface
        this.store = {};
        //get the id of the current activated route once the user clicks the button
        //this allows us to use this information to determine whether or not we can go to the
        //the next page containing the store information.
        var id = +this.activatedRouter.snapshot.params["id"];
        console.log(id);
        if (id) {
            var url = this.baseUrl + "api/store/" + id;
            this.http.get(url).subscribe(function (result) {
                _this.store = result;
            });
        }
        else {
            console.log("invalid id: routing back to home ...");
            this.router.navigate(['home']);
        }
    }
    StoreComponent = __decorate([
        core_1.Component({
            selector: "store",
            templateUrl: "./store.component.html",
            styleUrls: ['./store.component.css']
        }),
        __param(3, core_1.Inject('Base_URL'))
    ], StoreComponent);
    return StoreComponent;
}());
exports.StoreComponent = StoreComponent;
//# sourceMappingURL=store.component.js.map
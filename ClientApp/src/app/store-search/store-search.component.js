"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StoreSearchComponent = /** @class */ (function () {
    function StoreSearchComponent() {
    }
    __decorate([
        core_1.Input()
    ], StoreSearchComponent.prototype, "class", void 0);
    __decorate([
        core_1.Input()
    ], StoreSearchComponent.prototype, "placeholder", void 0);
    StoreSearchComponent = __decorate([
        core_1.Component({
            selector: "store-search",
            templateUrl: './store-search.component.html',
            styleUrls: ['./store-search.component.css']
        })
    ], StoreSearchComponent);
    return StoreSearchComponent;
}());
exports.StoreSearchComponent = StoreSearchComponent;
//# sourceMappingURL=store-search.component.js.map
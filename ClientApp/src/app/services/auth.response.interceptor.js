"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var auth_service_1 = require("./auth.service");
var rxjs_1 = require("rxjs");
var AuthResponseInterceptor = /** @class */ (function () {
    function AuthResponseInterceptor(injector, router) {
        this.injector = injector;
        this.router = router;
    }
    //check if there's a token or not if we don't see a token there is no need to do anything
    //Other do 2 things : store a reference to the current request in an internal property
    // the seconde is : set up the even hanlder that will call the handleError() method in case of HTTP errors
    AuthResponseInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        this.auth = this.injector.get(auth_service_1.AuthService);
        var token = (this.auth.isLoggedIn()) ? this.auth.getAuth().token : null;
        if (token) {
            // save current request
            this.currentRequest = request;
            return next.handle(request)
                .do(function (event) {
                if (event instanceof http_1.HttpResponse) {
                    // do nothing
                }
            })
                .catch(function (error) {
                return _this.handleError(error);
            });
        }
        else {
            return next.handle(request);
        }
    };
    //Check whether we are dealing with an HTTPError Response with status code of 401
    //if the conditions match we attempt to refresh the token usht the refreshToken() method
    //of the AuthService with the following outcomes:
    // if successfull we resubmit the requesttaht triggered the response error which we store
    //in the this.currentRequest local property
    //if not successfull we perform a logout and clear all the expired tokens from the local storage
    //redirect the user back to the login screen.
    AuthResponseInterceptor.prototype.handleError = function (err) {
        var _this = this;
        if (err instanceof http_1.HttpErrorResponse) {
            if (err.status === 401) {
                // JWT token might be expired:
                // try to get a new one using refresh token
                console.log("Token expired. Attempting refresh...");
                this.auth.refreshToken()
                    .subscribe(function (res) {
                    if (res) {
                        // refresh token successful
                        console.log("refresh token successful");
                        // re-submit the failed request
                        var http = _this.injector.get(http_1.HttpClient);
                        http.request(_this.currentRequest).subscribe(function (result) {
                            // do something
                        }, function (error) { return console.error(error); });
                    }
                    else {
                        // refresh token failed
                        console.log("refresh token failed");
                        // erase current token
                        _this.auth.logout();
                        // redirect to login page
                        _this.router.navigate(["login"]);
                    }
                }, function (error) { return console.log(error); });
            }
        }
        return rxjs_1.Observable.throw(err);
    };
    AuthResponseInterceptor = __decorate([
        core_1.Injectable()
    ], AuthResponseInterceptor);
    return AuthResponseInterceptor;
}());
exports.AuthResponseInterceptor = AuthResponseInterceptor;
//# sourceMappingURL=auth.response.interceptor.js.map
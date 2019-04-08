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
var rxjs_1 = require("rxjs");
require("rxjs/Rx");
var AuthService = /** @class */ (function () {
    function AuthService(http, platformId) {
        this.http = http;
        this.platformId = platformId;
        this.authKey = "auth";
        this.clientId = "CollegeStore";
    }
    // performs the login
    AuthService.prototype.login = function (username, password) {
        var url = "api/token/auth";
        var data = {
            username: username,
            password: password,
            client_id: this.clientId,
            // required when signing up with username/password
            grant_type: "password",
            // space-separated list of scopes for which the token is issued
            scope: "offline_access profile email"
        };
        return this.getAuthFromServer(url, data);
    };
    // try to refresh token
    AuthService.prototype.refreshToken = function () {
        var url = "api/token/auth";
        var data = {
            client_id: this.clientId,
            // required when signing up with username/password
            grant_type: "refresh_token",
            refresh_token: this.getAuth().refresh_token,
            // space-separated list of scopes for which the token is issued
            scope: "offline_access profile email"
        };
        return this.getAuthFromServer(url, data);
    };
    // retrieve the access & refresh tokens from the server
    AuthService.prototype.getAuthFromServer = function (url, data) {
        var _this = this;
        return this.http.post(url, data)
            .map(function (res) {
            var token = res && res.token;
            // if the token is there, login has been successful
            if (token) {
                // store username and jwt token
                _this.setAuth(res);
                // successful login
                return true;
            }
            // failed login
            return rxjs_1.Observable.throw('Unauthorized');
        })
            .catch(function (error) {
            return new rxjs_1.Observable(error);
        });
    };
    // performs the logout
    AuthService.prototype.logout = function () {
        this.setAuth(null);
        return true;
    };
    // Persist auth into localStorage or removes it if a NULL argument is given
    AuthService.prototype.setAuth = function (auth) {
        if (auth) {
            localStorage.setItem(this.authKey, JSON.stringify(auth));
        }
        else {
            localStorage.removeItem(this.authKey);
        }
        return true;
    };
    // Retrieves the auth JSON object (or NULL if none)
    AuthService.prototype.getAuth = function () {
        var i = localStorage.getItem(this.authKey);
        if (i) {
            return JSON.parse(i);
        }
        else {
            return null;
        }
    };
    // Returns TRUE if the user is logged in, FALSE otherwise.
    AuthService.prototype.isLoggedIn = function () {
        return localStorage.getItem(this.authKey) != null;
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(core_1.PLATFORM_ID))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
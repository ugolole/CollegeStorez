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
var forms_1 = require("@angular/forms");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, fb, http, baseUrl) {
        this.router = router;
        this.fb = fb;
        this.http = http;
        this.baseUrl = baseUrl;
        this.title = "New User Registration";
        // initialize the form
        this.createForm();
    }
    RegisterComponent.prototype.createForm = function () {
        this.form = this.fb.group({
            Username: ['', forms_1.Validators.required],
            Email: ['',
                [forms_1.Validators.required,
                    forms_1.Validators.email]
            ],
            Password: ['', forms_1.Validators.required],
            PasswordConfirm: ['', forms_1.Validators.required],
            DisplayName: ['', forms_1.Validators.required]
        }, {
            validator: this.passwordConfirmValidator
        });
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        // build a temporary user object from form values
        var tempUser = {};
        tempUser.Username = this.form.value.Username;
        tempUser.Email = this.form.value.Email;
        tempUser.Password = this.form.value.Password;
        tempUser.DisplayName = this.form.value.DisplayName;
        var url = this.baseUrl + "api/user";
        this.http
            .put(url, tempUser)
            .subscribe(function (res) {
            if (res) {
                var v = res;
                console.log("User " + v.Username + " has been created.");
                // redirect to login page
                _this.router.navigate(["login"]);
            }
            else {
                // registration failed
                _this.form.setErrors({
                    "register": "User registration failed."
                });
            }
        }, function (error) { return console.log(error); });
    };
    RegisterComponent.prototype.onBack = function () {
        this.router.navigate(["home"]);
    };
    RegisterComponent.prototype.passwordConfirmValidator = function (control) {
        var p = control.root.get('Password');
        var pc = control.root.get('PasswordConfirm');
        if (p && pc) {
            if (p.value !== pc.value) {
                pc.setErrors({ "PasswordMismatch": true });
            }
            else {
                pc.setErrors(null);
            }
        }
        return null;
    };
    // retrieve a FormControl
    RegisterComponent.prototype.getFormControl = function (name) {
        return this.form.get(name);
    };
    // returns TRUE if the FormControl is valid
    RegisterComponent.prototype.isValid = function (name) {
        var e = this.getFormControl(name);
        return e && e.valid;
    };
    // returns TRUE if the FormControl has been changed
    RegisterComponent.prototype.isChanged = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    };
    // returns TRUE if the FormControl is invalid after user changes
    RegisterComponent.prototype.hasError = function (name) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: "register",
            templateUrl: "./register.component.html",
            styleUrls: ['./register.component.less']
        }),
        __param(3, core_1.Inject('BASE_URL'))
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map
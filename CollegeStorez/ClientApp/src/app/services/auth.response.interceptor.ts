import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";

import {
  HttpClient, HttpHandler, HttpEvent,
  HttpInterceptor, HttpRequest, HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";

import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {

  currentRequest: HttpRequest<any>;
  auth: AuthService;

  constructor(private injector: Injector, private router: Router) { }

  //check if there's a token or not if we don't see a token there is no need to do anything
  //Other do 2 things : store a reference to the current request in an internal property
  // the seconde is : set up the even hanlder that will call the handleError() method in case of HTTP errors
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.auth = this.injector.get(AuthService);
    var token = (this.auth.isLoggedIn()) ? this.auth.getAuth()!.token : null;

    if (token) {
      // save current request
      this.currentRequest = request;
      return next.handle(request)
        .do((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do nothing
          }
        })
        .catch(error => {
          return this.handleError(error)
        });
    }
    else {
      return next.handle(request);
    }
  }


  //Check whether we are dealing with an HTTPError Response with status code of 401
  //if the conditions match we attempt to refresh the token usht the refreshToken() method
  //of the AuthService with the following outcomes:
  // if successfull we resubmit the requesttaht triggered the response error which we store
  //in the this.currentRequest local property
  //if not successfull we perform a logout and clear all the expired tokens from the local storage
  //redirect the user back to the login screen.
  handleError(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        // JWT token might be expired:
        // try to get a new one using refresh token
        console.log("Token expired. Attempting refresh...");
        this.auth.refreshToken()
          .subscribe(res => {
            if (res) {
              // refresh token successful
              console.log("refresh token successful");
              // re-submit the failed request
              var http = this.injector.get(HttpClient);
              http.request(this.currentRequest).subscribe(
                result => {
                  // do something
                }, error => console.error(error)
              );
            }
            else {
              // refresh token failed
              console.log("refresh token failed");
              // erase current token
              this.auth.logout();
              // redirect to login page
              this.router.navigate(["login"]);
            }
          }, error => console.log(error));
      }
    }
    return Observable.throw(err);
  }
}

import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less']
})
export class NavMenuComponent {
  constructor(
    public auth: AuthService,
    private router: Router
  ) {
  }

  logout() {
    // logs out the user, then redirects him to Home View.
    if (this.auth.logout()) {
      this.router.navigate(["home"]);
    }
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

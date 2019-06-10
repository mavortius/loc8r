import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication.service";
import { User } from "../user";

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  constructor(private authentication: AuthenticationService) {
  }

  ngOnInit() {
  }

  public doLogout(): void {
    this.authentication.logout();
  }

  public isLoggedIn(): boolean {
    return this.authentication.isLoggedIn();
  }

  public getUsername(): string {
    const user: User = this.authentication.getCurrentUser();
    return user ? user.name : 'Guest';
  }
}

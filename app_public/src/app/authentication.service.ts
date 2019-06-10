import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from "./storage";
import { Loc8rDataService } from "./loc8r-data.service";
import { User } from "./user";
import { AuthResponse } from "./auth-response";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly TOKEN_KEY = 'loc8r-token';

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
              private dataService: Loc8rDataService) {
  }

  public getToken(): string {
    return this.storage.getItem(this.TOKEN_KEY);
  }

  public saveToken(token: string): void {
    this.storage.setItem(this.TOKEN_KEY, token);
  }

  public login(user: User): Promise<any> {
    return this.dataService.login(user)
      .then((response: AuthResponse) => this.saveToken(response.token));
  }

  public register(user: User): Promise<any> {
    return this.dataService.register(user)
      .then((response: AuthResponse) => this.saveToken(response.token));
  }

  public logout(): void {
    this.storage.removeItem(this.TOKEN_KEY);
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();

    if (token) {
      const payload = this.extractPayload(token);
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = this.extractPayload(token);
      return { email, name } as User;
    }
  }

  private extractPayload(token: string) {
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
  }
}

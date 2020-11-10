import {Injectable} from '@angular/core'

@Injectable({providedIn: 'root'})
export class UserService {
  isLoggedIn = false
  isAdmin = false

  get token():string {
    return localStorage.getItem('token')
  }
  set token(token:string) {
    localStorage.setItem('token', token)
  }

  // Deprecated!
  reset():void {
    this.isLoggedIn = false
    this.isAdmin = false

    localStorage.removeItem('token')
  }

  login(role:string):void {
    this.isLoggedIn = true

    if (role === 'admin') {
      this.isAdmin = true
    }
  }

  logout():void {
    this.isLoggedIn = false
    this.isAdmin = false

    localStorage.removeItem('token')
  }
}
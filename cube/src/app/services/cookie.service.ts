import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor() { }

  setCookie(name: string, value: string, expireDays: number, path: string = ''): void {
    const date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    const cookieValue = `${name}=${value}; ${expires}; path=${path}`;
    document.cookie = cookieValue;
  }

  getCookie(name: string): string | null {
    const cookieName = `${name}=`;
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  }

  deleteCookie(name: string, path: string = ''): void {
    this.setCookie(name, '', -1, path);
  }
}

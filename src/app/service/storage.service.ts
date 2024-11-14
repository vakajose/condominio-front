import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
